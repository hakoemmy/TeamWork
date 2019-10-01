const openNav = () => {
  document.querySelector('#mySidenav').style.width = '250px';
}

const closeNav = () => {
  document.querySelector('#mySidenav').style.width = '0';
};
// Tabbed comment panel
const openTab = (evt, tabName) => {
 const element1 = document.querySelector('.empty');
 const titleElement = document.querySelector('.custom-input');
 if(element1 !=undefined){
  element1.style.margin = '0px';
 }
  
  if(tabName === 'preview'){
    const comment = document.querySelector('#comment');
    const prev = document.querySelector('#comment-preview');
   prev.innerHTML=comment.value;
  }
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
// Dialog Box
const dialogbox = (message) => { // Get the modal
  const modal = document.querySelector('#dialogbox');

  const divMsg = document.querySelector('.dialog-content-js');


  divMsg.textContent = message;
  // Display the modal
  modal.style.display = 'block';
};
const closeDialog = () => {
  document.querySelector('.modal').style.display = 'none';
  const modal = document.querySelector('#dialogbox');
  modal.style.display = 'none';
};

const shareArticle = () => {
  document.querySelector('.modal-view').style.display = 'block';
};
const closeShareArticle = () => {
  document.querySelector('.modal-view').style.display = 'none';
};

