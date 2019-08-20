/*
List Pagination and Filtering

<body>
    <div class="page">
      <div class="page-header cf">
        <h2>Students</h2>

        <!-- student search HTML to add dynamically -->
        <div class="student-search">
          <input placeholder="Search for students...">
          <button>Search</button>
        </div>
        <!-- end search -->
*/

const listItems = document.querySelectorAll('li')


const listItemsOnPage = ''




/*
   Hides all of the items in the list and shows ten of them .
*/

const showPage = (list, page) => {
   for (let i=0; i<list.length; i++) {
      list[i].style.display = 'none'
   }
   const startIndex = (page * 10) - 10
   const endIndex = page * 10
   const studentsList = []
   for (let i=0; i<list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         console.log(list[i])
         list[i].style.display = 'block'
         studentsList.push(list[i])
      }
   }
return studentsList
}

//console.log(showPage(listItems, 2))
/*
Generates and appends pagination buttons, with functionality
*/
const appendPageLinks = (list) => {
   console.log('ok')
   const pageTotal = Math.ceil(list.length / 10)
   const mainDiv = document.querySelector('.page')
   const containerDiv = document.createElement('div')
   containerDiv.className = 'pagination'
   const nestedUl = document.createElement('ul')

   for (let i=1; i<=pageTotal; i++) {
      const listItem = document.createElement('li')
      const aItem = document.createElement('a')
      aItem.href = '#'
      if (i==1) {
         aItem.className = 'active'
      }
      aItem.textContent = i.toString()
      listItem.appendChild(aItem)
      nestedUl.appendChild(listItem)

   }

   containerDiv.appendChild(nestedUl)
   mainDiv.appendChild(containerDiv)

   nestedUl.addEventListener('click', (e) => {
      if (e.target.tagName = 'a') {
         const paginationLinks = document.querySelectorAll('div.pagination > ul > li > a') //div.pagination > ul > li > a
         for (let i=0; i<paginationLinks.length; i++) {
            paginationLinks[i].className = ''
         }
         const pageNumberRequest = e.target.textContent
         e.target.className = 'active'
         showPage(listItems, pageNumberRequest)
      }
   })

}

const searchStudent = (request) => {
   const studentNames = document.querySelectorAll('ul.student-list > li')
   const studentsFound = []
   for (let i=0; i<studentNames.length; i++) {
      //hides all students
      studentNames[i].style.display = 'none'

      let divTag = studentNames[i].firstElementChild
      let imgTag = divTag.firstElementChild
      let h3Tag = imgTag.nextElementSibling
      let studentName = h3Tag.textContent
      if (studentName.includes(request)) {
         studentsFound.push(studentNames[i])
         studentNames[i].style.display = 'block'
         //studentNames[i].style.display = 'block'
      } /*else {
         studentNames[i].parentElement.parentElement.style.display = 'none'
      } */

   }
   console.log('founded')
   console.log(studentsFound)

}

const showSearchInput = () => {
   const containerDiv = document.querySelector('.page-header')
   const studentSearchDiv = document.createElement('div')
   studentSearchDiv.className = 'student-search'
   const studentSearchInput = document.createElement('input')
   studentSearchInput.placeholder = 'Search for students...'
   const studentSearchButton = document.createElement('button')
   studentSearchButton.textContent = 'Search'

   containerDiv.appendChild(studentSearchDiv)
   studentSearchDiv.appendChild(studentSearchInput)
   studentSearchDiv.appendChild(studentSearchButton)


   studentSearchButton.addEventListener('click', (e) => {
      if (e.target.textContent === 'Search') {
         searchStudent(studentSearchInput.value)
      }
   })

}



showPage(listItems, 1)
appendPageLinks(listItems)
showSearchInput()