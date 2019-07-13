# Intructions to run the experiment: -

## 1. Starting the Virtual Enviroment:
--------------------------------------

To ensure that all the libraries required for the experiment are installed, run the experiment inside the provided virtual enviroment. To activate the virtual enviroment:

**For Linux/MacOS:**
* Open the terminal inside the *SRIP* folder.
* Run the command `$ source venv_linux/bin/activate` to activate the virtual enviroment.
* After work is done, run the command `$ deactivate` to deactive the virtual enviroment.

**For Windows**
* Open the command prompt/powershell inside the *SRIP* folder.
* Run the command `> venv_windows/Scripts/activate` to activate the virtual enviroment.
* After work is done, run the command `> deactivate` to deactive the virtual enviroment.

**Note:** In Windows, running the command directly may give a Security Error. If that happens, execute the command `>  Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force` before executing the command.


## 2. Starting the server:
--------------------------

* Go open the *Codes* folder inside the *SRIP* folder.
* Inside, there is a file named `main_server_script.py`. Open the terminal/cmd/powershell in the current folder and execute the command `python main_server_script.py`.
* The server will start running and a link will appear. Copy this link and open it inside a web browser. The experiment will start running inside the browser.
* After the work is done, press `Ctrl+C` to close the server.