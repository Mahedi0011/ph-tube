
//  https://openapi.programming-hero.com/api/videos/


// *************** this is my dynamic navbar part start*************
const navCategory = async () => {
    const category = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const categories = await category.json();
    const categoriesData = categories.data;
    // console.log(categoriesData)
    navItems(categoriesData)

}

const navItems = (categoriesData) => {
    // console.log(categoriesData.category_id);
    const navbar = document.getElementById('navbar')
    categoriesData.map(categoryData => {
        // console.log(categoryData)
        const navDiv = document.createElement('div');
        navDiv.classList = "m-4"
        navDiv.innerHTML = `<button onClick="allCourse(${categoryData.category_id})" class="btn btn-active text-black">
            ${categoryData.category}</button>`;
        navbar.appendChild(navDiv);
        // btnClick(category_id)
        
    })

}


// *************** this is my dynamic navbar part end*************

navCategory()


// const btnClick = async (category_id) => {
//     // console.log('this is click',category_id)
//     const categoryIdData = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
//     const categoryData = await categoryIdData.json();
//     console.log(categoryData);
//     // allCourseDisplay(categoryData)
        
// }

//  https://openapi.programming-hero.com/api/videos/category/1000



const allCourse = async (category_id) => {
    
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id ? category_id : "1000"}`);
    const data = await res.json();
    const courses = data.data;
    // console.log(courses);
    allCourseDisplay(courses)
}

const allCourseDisplay = courses => {
    // console.log(courses);
    const errorPage = document.getElementById('errorPage')
    errorPage.innerHTML = '';
    const displayCourse = document.getElementById('displayCourse');
    displayCourse.innerHTML = '';

if(courses.length > 0){

   courses?.map(course => {
        // console.log(course)
        course.authors.map(authors => {           
            // console.log(authors)

            const courseDiv = document.createElement('div')            
            courseDiv.innerHTML = ` 
        
         <figure>
            <img 
            src="${course.thumbnail}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">
             <img class="w-5" src="${authors.profile_picture}" alt="">
          ${course.title}     
            </h2>
            <p> Name : ${authors.profile_name}</p>
            <div class="card-actions justify-start">
                 <div class="">views ${course.others.views}</div>
                 
               ${authors?.verified ? '<p><input type="checkbox" checked="checked" class="checkbox checkbox-primary" /></p>' : ''}
                
            </div>
        </div>    
        `
            displayCourse.appendChild(courseDiv);
           
        })
        // navItems(course.category_id)
 
        // <div class="card bg-base-100 w-96 shadow-xl">

    })
}
else{

    errorPage.innerHTML = `
    <div class="flex flex-col items-center mt-10 gap-y-5 justify-center ">
    <img  src="./img/Icon.png" alt="">
    <p class="text-center text-3xl font-bold">Oops!! Sorry, There is no<br> content here</p>
    </div>
    `
}
   


}

allCourse()