const m=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function h(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(t){if(t.ep)return;t.ep=!0;const a=h(t);fetch(t.href,a)}};m();var v="./assets/m.21577d5a.mp3",w="./assets/click.248312c2.wav",b="./assets/false.66be19b4.wav",g="./assets/true.9f44cd89.wav",L="./assets/success.490ec437.wav",$="./assets/fireworks1.f814ada5.wav";const f=document.querySelector("#birthday");f.innerHTML=`
  <h1></h1>
  <h1>\u203A_~</h1>
  <audio src=${w} preload=auto></audio>
  <audio src=${g} preload=auto></audio>
  <audio src=${b} preload=auto></audio>
  <audio src=${L} preload=auto></audio>
  <audio src=${$} preload=auto></audio>
  <audio src=${v} preload=auto loop></audio>
`;const u=document.querySelectorAll("h1"),r=document.querySelectorAll("audio"),q=document.querySelectorAll("#stars,#stars2,#stars3");function p(){u[0].style.animation="hb 1.5s infinite alternate cubic-bezier(0.25, 0.46, 0.45, 0.94)",u[1].style.animation="hb 1.5s infinite alternate cubic-bezier(0.25, 0.46, 0.45, 0.94)",f.addEventListener("click",e=>{e.stopPropagation(),r[5].play(),party.confetti(u[1],{count:party.variation.range(9,20)}),u[0].innerText="\u{1F38A}Happy Birthday\u{1F38A}",u[1].innerText="\u{1F389}Mechid\u{1F973}";for(let s=0;s<3;s++)q[s].style.animation=`stars${s+1} 60s 1s ease-in-out infinite alternate`},{once:!0}),document.addEventListener("click",e=>{r[4].play(),party.sparkles(e,{count:party.variation.range(3,7),size:party.variation.range(.8,1.2)})})}const l=document.querySelector("dialog");if(typeof l.showModal!="function"){l.hidden=!0;let e=prompt(`\u{1F60E}Hi mechid\u2728, We've create for u a Gift\u{1F381}
but first, u need to answer the question:
wich year our first meeting?`,"");if(e=="2014")alert(`Yes\u{1F601} 2014!!
it's was awesome 8 years of friendship!!`);else if(e.startsWith("201"))alert(`Nooo\u{1F605} we meet on 2014 not "${e}"!!
it's was awesome 8 years of friendship!!`);else if(!e.startsWith("201")){for(;!e.startsWith("201");)e=prompt(`\u26A0\uFE0Fwarning "${e}" not a number!!
\u{1F4A1} our first meeting year was:    201#`,"");e=="2014"?alert(`Yes\u{1F601} 2014!!
it's was awesome 8 years of friendship!!`):e.startsWith("201")&&alert(`Nooo\u{1F605} we meet on 2014 not "${e}"!!
it's was awesome 8 years of friendship!!`)}p()}const n=document.querySelector("select"),i=document.querySelector("input[type=date]"),o=document.querySelectorAll("output"),y=document.querySelector("button");document.addEventListener("DOMContentLoaded",()=>{typeof l.showModal=="function"&&(l.showModal(),l.addEventListener("click",()=>r[0].play()),n.addEventListener("change",()=>{i.value=="2000-01-15"&&n.value==2014?(r[3].play(),n.disabled=!0,y.disabled=!1,o[0].style.color="hsl(90,100%,50%)",o[0].innerText=`Yes\u{1F601} 2014!!
it's was awesome 8 years of friendship!!`):n.value==2014?(r[1].play(),n.disabled=!0,o[0].style.color="hsl(90,100%,50%)",o[0].innerText=`Yes\u{1F601} 2014!!
it's was awesome 8 years of friendship!!`):(r[2].play(),o[0].style.color="darkorange",o[0].innerText=`Nooo\u{1F605} we meet on 2014 not ${n.value}!!`)}),i.addEventListener("change",()=>{i.value=="2000-01-15"&&n.value==2014?(r[3].play(),i.disabled=!0,y.disabled=!1,o[1].style.color="hsl(90,100%,50%)",o[1].innerText=`Yes\u{1F601} 15th january!!
you're younger than me by 135 day!!`):i.value=="2000-01-15"?(r[1].play(),i.disabled=!0,o[1].style.color="hsl(90,100%,50%)",o[1].innerText=`Yes\u{1F601} 15th january!!
you're younger than me by 135 day!!`):(r[2].play(),o[1].style.color="darkorange",o[1].innerText="Nooo\u{1F605} my birthday on 15th january!")}),l.addEventListener("close",()=>p(),{once:!0}))});
