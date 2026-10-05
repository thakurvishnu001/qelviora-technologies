import fs from 'node:fs';
import path from 'node:path';
import {inflateRawSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const root=path.resolve('app'),zip=fs.readFileSync('website-source.zip');
const manifest=JSON.parse(fs.readFileSync('source-manifest.json','utf8'));
if(createHash('sha256').update(zip).digest('hex')!==manifest.sha256)throw Error('Source archive checksum mismatch.');
let end=-1;for(let i=zip.length-22;i>=Math.max(0,zip.length-65557);i--)if(zip.readUInt32LE(i)===0x06054b50){end=i;break;}
if(end<0)throw Error('Invalid source archive.');
let offset=zip.readUInt32LE(end+16),count=zip.readUInt16LE(end+10),written=0;
for(let n=0;n<count;n++){
 if(zip.readUInt32LE(offset)!==0x02014b50)throw Error('Invalid archive directory.');
 const flags=zip.readUInt16LE(offset+8),method=zip.readUInt16LE(offset+10),size=zip.readUInt32LE(offset+20),original=zip.readUInt32LE(offset+24),names=zip.readUInt16LE(offset+28),extra=zip.readUInt16LE(offset+30),comment=zip.readUInt16LE(offset+32),local=zip.readUInt32LE(offset+42);
 const name=zip.subarray(offset+46,offset+46+names).toString('utf8').replaceAll('\\','/');offset+=46+names+extra+comment;
 if(flags&1||original>100000000||name.startsWith('/')||name.split('/').some(x=>x==='..'||x==='.data'||x==='.env'||x==='.git'))throw Error('Unsafe source entry.');
 const target=path.resolve(root,name);if(!target.startsWith(root+path.sep))throw Error('Source entry outside app.');
 if(name.endsWith('/')){fs.mkdirSync(target,{recursive:true});continue;}
 if(zip.readUInt32LE(local)!==0x04034b50)throw Error('Invalid source file.');
 const start=local+30+zip.readUInt16LE(local+26)+zip.readUInt16LE(local+28),compressed=zip.subarray(start,start+size);
 const bytes=method===0?compressed:method===8?inflateRawSync(compressed):null;if(!bytes||bytes.length!==original)throw Error('Invalid compressed source.');
 fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,bytes);written++;
}
if(!fs.existsSync(path.join(root,'server.mjs')))throw Error('Application server missing.');
console.log('Prepared '+written+' application files.');
