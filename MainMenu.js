NoPressAudio=true;
function Init(){
    M_Start();
}

function M_Start()
{
    Pillars[0]=document.getElementById("Pillar1");
    Pillars[1]=document.getElementById("Pillar2");
    Pillars[2]=document.getElementById("Pillar3");
    Pillars[0].style.left="3000px";
    Pillars[1].style.left="4000px";
    Pillars[2].style.left="5000px";
    UInter=false;
    BGM = new Audio('flappy-bird-assets/audio/BGM.mp3');
    M_Update();
}

function StartButton(){
    var x=document.getElementById("VolumeBar");
    sessionStorage.setItem("Volume",x.value/100);
    window.location.href="game.html";
}


function M_Update()
{
    
    //Collission(Pillar[0]);
    
    if(Hit==true)
    {
        return;
    }
    MovePillar();
    PillarReInitialisation();
    window.requestAnimationFrame(Update);
    t+=0.05;
    PlayBGM();
    
}

function Settings(a){
    document.getElementById("Volume").classList.remove("Hidden");
    a.parentElement.parentElement.classList.add("Hidden");
}
function MainMenu(a){
    document.getElementById("MainMenu").classList.remove("Hidden");
    a.parentElement.classList.add("Hidden");
}

function m_MovePillar(){
    for(i=0;i<Pillars.length;i++){
        const xP1=Pillars[i].style.left.substring(0,Pillars[i].style.left.length-2);
        Pillars[i].style.left=(xP1-Pspeed)+"px";
        noise.seed(1000);
        var x=(15*(Math.cos(xP1/80)+Math.sin(xP1/100)/2));
        console.log(5*noise.perlin2(xP1,xP1));
        Pillars[i].children[0].style.bottom=x+"px";
        Pillars[i].children[1].style.top=(40-x)+"px";
    }
}

function m_PillarReInitialisation(){
    m_ReInitPillar(Pillars[0]);
    m_ReInitPillar(Pillars[1]);
    m_ReInitPillar(Pillars[2]);
}

function m_ReInitPillar(obj)
{
    const OP=obj.getBoundingClientRect();
    //console.log(OP.name+t);
    if(OP.right<0 && t>8)
    {
        if(pts>=3)
            obj.style.left=(1500+Math.random()*2000)+"px";
        else
            obj.style.left=(3000+Math.random()*2000)+"px";
        t=0;
        pts++;
        if(NoPressAudio==false){
            console.log(NoPressAudio);
            PlayAudio('flappy-bird-assets/audio/point.wav');
        }
    }
}


