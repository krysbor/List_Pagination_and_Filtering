/*
List Pagination and Filtering
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

showPage(listItems, 1)
appendPageLinks(listItems)











