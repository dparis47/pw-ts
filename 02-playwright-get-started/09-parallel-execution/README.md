# Parallel execution

Worker is the new instance of the web browser and by default playwright creates a worker for each spec file and execute them in parallel.  
N spec files in test project, Playwright will create N workers and will execute N parallel threads or N web browsers in parallel.
Inside of each worker tests will be executed sequentially one by one.

playwright.config.ts
* fully parrallel FALSE
```sh 
  fullyParallel: false,
  workers: process.env.CI ? 2 : undefined,
```
Playwright will create N workers for each of the spec file and execute in N threads on another words and   
fully parallel means that all tests will be executed sequentially within single spec file

* fully parrallel TRUE
```sh 
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
```
Playwright will run tests also in N workers, but within each worker tests will be executed in parallel as well within each spec file.  
It randomly selects the spec file for the

order of the execution

* Sequential
```sh 
  fullyParallel: true,
  workers: process.env.CI ? 2 : 1,
```
Playwright will use just a single worker and will execute all tests, including the specs files just sequentially.  
> Time of execution should increase significantly

## Spec file
* To run the tests in parallel only within the certain spec file

playwright.config.ts
```sh
  fullyParallel: false,
```
*.spec.ts
```sh
// tests run in parallel
test.describe.parallel('From category page', () => {
  
   test('first', async ({ page }) => {
     ...
   })  
  
   test('second', async ({ page }) => {
     ...
   })  
}})
```

*  To run the **entire** spec file to be executed in parallel

Run tests within this spec file in parallel assigning a new independent worker for each test so the global config is configured to false, but this particular file will be
executed in parallel.  

   *.spec.ts
```sh

test.describe.configure({mode: parallel})

test.describe('From category page', () => {
  
   test('first', async ({ page }) => {
     ...
   })  
  
   test('second', async ({ page }) => {
     ...
   })  
}})
```