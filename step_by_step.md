# Step by step guide to creation of this repo

- Create a new folder from VS Code
  - open VS code
  - click open folder
  
    <img src="media/vs_code_open_folder.png" alt="VS Code Open Folder" style="width:300px;"/>

  - create a new folder and select
- Initialise repo and publish to Github



- Create a new Vue app with `npm create vue@latest`
  
  <img src="media/create_vue.png" alt="npm create vue at CLI" style="width:300px;"/>

- enter a name for the project - we used 'vue_blog'
- Yes to:
  - Vue Router - this allows the website to present different content based on URL
  - Pinia - we will use this to get database content and make available to Vue app
  - and ESLint - this will ensure the code is of reasonable quality

- then follow instructions in output to
  - cd vue_blog
  - npm install
  - npm run dev

You will see something like in the terminal:

<img src="media/first_npm_run_dev.png" alt="npm create vue at CLI" style="width:300px;"/>

and if you open your browser at the presented link:

<img src="media/first_npm_run_dev_browser.png" alt="npm create vue at CLI" style="width:300px;"/>
