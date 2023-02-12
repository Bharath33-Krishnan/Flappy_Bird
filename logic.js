let Pillars=[];
let Player;
let FrameRate=60;
let Pspeed=5;
let gravity=3;
let t=0;
let Hit=false;
let boost=0;
let pts=0;
let BGM;
let UInter=false;
NoPressAudio=true;
var Volume=0;
BNum=10;
Bdec=0.25;
const getFPS = () =>
  new Promise(resolve =>
    requestAnimationFrame(t1 =>
      requestAnimationFrame(t2 => resolve(1000 / (t2 - t1)))
    )
)
function Start()
{
    
    NoPressAudio=false;
    Volume=sessionStorage.getItem("Volume");
    Px=0;
    
    var y;
    
    getFPS().then(function(x){
        if(x>80){
            BNum=10;
        }
        else{
            BNum=7;
        }
        
        Pspeed=(Pspeed/x)*144;
        gravity=(gravity/x)*144;
        BNum=(BNum/x)*144;
        Bdec=(Bdec/x)*144;
    });
    
 
    Player=document.getElementById("Player");
    Player.style.bottom="1000px";
    Pillars[0]=document.getElementById("Pillar1");
    Pillars[1]=document.getElementById("Pillar2");
    Pillars[2]=document.getElementById("Pillar3");
    Player.classList.add("Idle");
    Pillars[0].style.left="3000px";
    Pillars[1].style.left="4000px";
    Pillars[2].style.left="5000px";
    UInter=false;
    BGM = new Audio('flappy-bird-assets/audio/BGM.mp3');
    t=0;
    boost=0;
    Update();
}

function Update()
{
    
    //Collission(Pillar[0]);
    
    if(Hit==true)
    {
        return;
    }
    MovePillar();
    PillarReInitialisation();
    Collisions();
    MovePlayer();
    UpdatePts();
    window.requestAnimationFrame(Update);
    t+=0.05;
    PlayBGM();
    
}
function PlayBGM(){
    if(UInter==false)
        return;
    if(BGM.paused==true
        || BGM.ended==true){
        BGM.play();
        BGM.volume=Volume;
        
    }
   // console.log(BGM.ended);
}
function UpdatePts(){
    if(UInter==false)
        return;
    var PT=document.getElementById("Points");
    if(PT==null)
        return;
    PT.innerHTML="Points : "+pts;
}
function Collisions(){
    for(i=0;i<Pillars.length;i++){
        Hit=DetectCollission(Pillars[i]);
        //console.log(Hit);
        if(Hit==true){
            break;
        }
    }
}

function PillarReInitialisation(){
    ReInitPillar(Pillars[0]);
    ReInitPillar(Pillars[1]);
    ReInitPillar(Pillars[2]);
}
function MovePlayer(){
    if(Player==null)
        return;
    /*const Px=Player.style.left.substring(0,Player.style.left.length-2);*/
    const Py=Player.style.bottom.substring(0,Player.style.bottom.length-2);
    
    //console.log();
    var _grav=gravity-boost;
    Player.style.bottom=(Py-_grav)+"px";
    //console.log(Py+boost);
    boost-=Bdec;
    boost=Math.max(0,boost);
    document.addEventListener('keydown',onkeypress);
    if(Py<-5 || Player.style.top<-5){
        Hit=true;
        Dead();
    }
   
}
function PlayAudio(a)
{
    var audio = new Audio(a);
    audio.play();
    audio.volume=0.5+Number(Volume);
}
function onkeypress(event){
    
    if(event.keyCode==32 && boost<5){
        UInter=true;
        //console.log(boost);
        boost+=BNum;
        k=boost;
        PlayAudio('flappy-bird-assets/audio/wing.wav');
    }
}

function DetectCollission(obj){
    if(Player==null)
        return;
    var OP=obj.getBoundingClientRect();
    let uCol=false;
    let lCol=false;
    const TR=Player.getBoundingClientRect();
    if(OP.left-TR.right<=0 && OP.right-TR.left>=0){
        OP=obj.children[0].getBoundingClientRect();
        if(TR.top-OP.bottom<=0)
        {
            Dead();
            return true;
            
        }
        OP=obj.children[1].getBoundingClientRect();
        if(OP.top-TR.bottom<=0){
            Dead();
            return true;
            
        }
    }

}
function Dead(){
    if(Player==null)
        return;
    var audio = new Audio('flappy-bird-assets/audio/hit.wav');
    audio.play();
    BGM.pause();
    Player.classList.add("paused");
    BGM=new Audio('flappy-bird-assets/audio/die.wav')
}
function ReInitPillar(obj)
{
    const OP=obj.getBoundingClientRect();
    //console.log(OP.name+t);
    if(OP.right<0 && t>8)
    {
        if(pts>=3)
            obj.style.left=(1500+Math.random()*2000)+"px";
        else
            obj.style.left=(3000+Math.random()*2000)+"px";
        var x=(10+Math.random()*40);
        obj.children[0].style.bottom=x+"%";
        obj.children[1].style.top=(40-x)+"%";
        t=0;
        pts++;
        if(NoPressAudio==false){
            console.log("dsasdas");
            PlayAudio('flappy-bird-assets/audio/point.wav');
        }
    }
}
function MovePillar(){
    for(i=0;i<Pillars.length;i++){
        
        const xP1=Pillars[i].style.left.substring(0,Pillars[i].style.left.length-2);
        Pillars[i].style.left=(xP1-Pspeed)+"px";
    }
}



function OpenXML(){
        alert("sasdas");
    var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            VolGet(this);
        }
    };
    xhttp.open("GET","Config.xml",true);
    xhttp.send();
}

function VolGet(xml)
{
    var xmlDoc=xml.responseXML;
    var name = xmlDoc.getElementsByTagName("Volume")[0];
    console.log(name.textContent);
    
}