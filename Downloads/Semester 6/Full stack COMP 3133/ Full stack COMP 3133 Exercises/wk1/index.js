console.log("Week 1- BufferExamples");

//create a buffer from string data 

let buf1 = Buffer.from('Hello')

console.log(buf1);

console.log(`buf1 : ${buf1}`); //shows the string
console.log(buf1.toString());

console.log(`Buffer in JSON format : ${buf1.toJSON()}`);
console.log(buf1.toJSON());

//Task = write a loop to iterate over the buffer
//show the value of element

console.log('buf1[0] : ${buf1[0]}');
console.log('buf1[3] : ${buf1[3]}');
console.log(`number of elements in buffer : ${buf1.length}`);


for (let i=0; i<buf1.length ; i++){
    console.log(`i = ${i}, buf1[${i}] = ${buf1[i]}  ${String.fromCharCode(buf1[i])}`);
}

console.log(`Buffer in String format : ${buf1.toString()}`);
console.log(`Buffer in Json format : ${buf1.toJSON()}`);
console.log(`Buffer in Hex format : ${buf1.toString('hex')}`);
console.log(`Buffer in UTF-8 format : ${buf1.toString('utf-8')}`);
console.log(`Buffer in UTF-16le format : ${buf1.toString('utf-16le')}`);

//for emogi key board cntrl+cmmd+space
buf1 = Buffer.from('😆 🐼 🚘')


console.log(`Buffer in String format : ${buf1.toString()}`);
console.log(`Buffer in Json format : ${buf1.toJSON()}`);
console.log(`Buffer in Hex format : ${buf1.toString('hex')}`);
console.log(`Buffer in UTF-8 format : ${buf1.toString('utf-8')}`);
console.log(`Buffer in UTF-16le format : ${buf1.toString('utf-16le')}`);

//allocate size of th ebuffer when creatimg it

let buf2 = Buffer.alloc(10)
console.log(buf2);
console.log(`buf 2 : ${buf2}\n`);

//buf2[3] = 'J'
//buf2[6] = 'L'
buf2.write('J',3)
buf2.write('K',8)
buf2.write('P',9)

console.log(buf2);
console.log(`buf 2 : ${buf2}\n`);

// it will override if theere is existing data o the buffer

buf2.write('COMP', 5)
console.log(buf2);
console.log(`buf 2 : ${buf2}\n`);

//EROOR OUT OF THW RANGE
// buf2.write('WINTYER', 15)
// console.log(buf2);
// console.log(`buf 2 : ${buf2}\n`); 

buf2 = Buffer.from([65, 66, 67, 68, 69, 70])
//buf2.write([65, 66, 67, 68, 69, 70])
console.log(buf2);
console.log(`buf 2 : ${buf2}\n`);

//Buffer. concat

let buf3 = Buffer.concat([buf1, buf2])

console.log(`buf1 : ${buf1}`);
console.log(`buf2 : ${buf2}`);
console.log(`buf3 : ${buf3}\n`);

//Buffer.copy()
buf2.copy(buf3)

console.log(`buf2 : ${buf2}`);
console.log(`buf3 : ${buf3}\n`);

//Buffer.comare() for comarision
// will return  0 if samew ;
//non zero value otherwisw  

let output = Buffer.compare(buf2, buf3)
console.log(`buf2 and buf3 are same ? : ${output}`);

buf2 = Buffer.from('ABC')
buf3 = Buffer.from('ABC')
output = Buffer.compare(buf2, buf3)
console.log(`${buf2} and ${buf3} are same ? : ${output}\n`);


buf2 = Buffer.from('abc')
buf3 = Buffer.from('ABC')
output = Buffer.compare(buf2, buf3)
console.log(`${buf2} and ${buf3} are same ? : ${output}\n`);

buf2 = Buffer.from('ABC')
buf3 = Buffer.from('abc')
output = Buffer.compare(buf2, buf3)
console.log(`${buf2} and ${buf3} are same ? : ${output}\n`);
