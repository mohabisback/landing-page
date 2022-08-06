/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

//*** GLOBAL VARIABLES ***//
const d = document;
const ul = document.getElementById('navbar__list');
const secList = document.getElementsByTagName ('section');
const header = document.getElementById('page__header')
let aList;
let hideHeader;

// build the nav
const addNav = () => {
  const frag = document.createDocumentFragment();
  for (const sec of secList){
    let li = d.createElement('li');
    let h2Text = sec.firstElementChild.firstElementChild.innerText;
    let a = d.createElement('a');
    a.classList.add('menu__link');
    a.innerText= h2Text;
    a.onclick = (e)=>{sec.scrollIntoView()};
    li.appendChild(a);
    frag.appendChild(li)
  }
  ul.appendChild(frag);
  aList = d.getElementsByTagName('a');
}
addNav();



// Add class 'active' to section when near top of viewport
const scrollEvent = document.addEventListener('scroll', (e)=>{
  let activeSec = secList[0];
  for (const sec of secList){
    sec.classList.remove('active-sec')
    if (sec.getBoundingClientRect().top < (window.innerHeight / 4)){
      activeSec = sec;
    }
  }
  activeSec.classList.add('active-sec')
  for (const a of aList){
    a.classList.remove('active')
    if(a.innerText == activeSec.firstElementChild.firstElementChild.innerText ){
      a.classList.add('active')
    }
  }

  showHeader()
})

//Mouse movement function
const mouseEvent = document.addEventListener('mousemove', (e)=>{
  if (e.clientY < 100){
    showHeader()
  }
})

//scroll stops & mouse stops
const showHeader = () =>{
  header.classList.remove('header__hidden');
  clearTimeout(hideHeader);
  hideHeader = setTimeout(() =>{ header.classList.add('header__hidden')}, 1000);

}
showHeader();

//add a float button
const floatButton = () => {
  const btn = document.createElement('button');
  btn.innerText = 'Top'
  btn.style = 'position: fixed; right: 3%; bottom: 3%; width: 8%; height: 8%'
  d.getElementById('body').appendChild(btn)
  btn.onclick = (e)=>{window.scrollTo({top: '0', behavior: 'smooth'})}
}
floatButton();

//make sections collapsible
const makeSecCollapsible = () => {
  for (const sec of secList){
    const secHeader = sec.getElementsByTagName('h2')[0];
    secHeader.onclick = (e) => {sectionHeaderClicked(sec)}
  }
}
makeSecCollapsible();
const sectionHeaderClicked = (section) => {
  const secBody = section.getElementsByClassName('section_body')[0]
  secBody.classList.toggle('section_body_hidden')
}
