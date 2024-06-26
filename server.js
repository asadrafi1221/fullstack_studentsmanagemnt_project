import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const studentarray = [];


app.get('/', (req, res) => {
    console.log('GET request received for /');
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.post('/', (req, res) => {
    console.log('POST request received for /');
    const studentdata = req.body;
    const name = studentdata.studentname;
    const rollnum = studentdata.studentrolnum;

    if(!name||!rollnum){
        return res.sendFile(path.join(__dirname, 'error.html'));

    }
    for(let i=0;i<studentarray.length;i++){
        if(rollnum===studentarray[i].studentdata.studentrolnum){
            return res.sendFile(path.join(__dirname, 'error.html'));
break;
        }
    }
    console.log(studentdata);

    studentarray.push({studentdata});
    return res.sendFile(path.join(__dirname, 'home.html'));


});
app.get('/view', (req, res) => {
    console.log('GET request received for /view');
    res.sendFile(path.join(__dirname, 'view.html'));

});
app.post('/update',(req,res)=>{
    const data = req.body;
    const newname=data.newname;
    const newrollnum = data.newrollnum;
const index= data.index;
if(!newname||!newrollnum ||!index){
    return res.sendFile(path.join(__dirname, 'error.html'));

}
const idnexrange =  studentarray.length;
if(index>studentarray.length){
    return res.sendFile(path.join(__dirname, 'error.html'));
}
console.log(studentarray.length);

studentarray[index].studentdata.studentname=newname;
studentarray[index].studentdata.studentrolnum=newrollnum;
return res.send('done');

})

const students = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];
app.get('/update', (req, res) => {
    console.log('GET request received for /update');
    return res.sendFile(path.join(__dirname, 'update.html'));
});
app.post('/view',(req,res)=>{
    console.log('done okay i am called but now');
    return res.send(studentarray);
})
app.listen(port, () => {
    return console.log(`Server is listening on port ${port}`);
});
