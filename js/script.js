/* List Pagination and Filtering */

const listItems = document.querySelectorAll('li')
const listItemsOnPage = ''

/*
Hides all of the items in the list and displays ten of them
Returns list of students .
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
         list[i].style.display = 'block'
         studentsList.push(list[i])
      }
   }
return studentsList
}

/* Generates and appends pagination buttons with functionality */
const appendPageLinks = (list) => {
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
         showPage(list, pageNumberRequest)
      }
   })
}

/*
Searchs for students and displays results on the page.
If no students are found, a message is displayed on the page.
Takes string, which is the search phrase as an argument.
*/

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
      }
   }

   const noResultsMessage = document.createElement('p')
   noResultsMessage.textContent = 'no results'
   const divRemove = document.querySelector('div.pagination')
   const divContainer = document.querySelector('div.page-header')
   const lastElement = divContainer.lastElementChild
   if (studentsFound.length > 0) {
      //Displays found students
      showPage(studentsFound, 1)
      //deletes div with all page links
      divRemove.remove()
      appendPageLinks(studentsFound)
      divContainer.removeChild()
   } else {
      //Displays message when no students was found
      divRemove.remove()
      appendPageLinks(studentsFound)
   }
}


/* Displays search input */
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
         studentSearchInput.value = ''
      }
   })

   studentSearchInput.addEventListener('keyup', () => {
         searchStudent(studentSearchInput.value)
   })
}

showPage(listItems, 1)
appendPageLinks(listItems)
showSearchInput()