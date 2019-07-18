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

## Alternative: Without using the Virtual Enviroment:
-----------------------------------------------------

To run the experiment without using the virtual environment, follow these steps:

**For Ubuntu:**
* Open the terminal.
* Install *pip* for python 3 using the command `sudo apt install python3-pip`, or if python 3 is default, then `sudo apt install python-pip`.
* Inside the terminal, go to the *SRIP* folder or open a new terminal inside the *SRIP* folder.
* Run the command `pip3 install -r requirements.txt`, or if python 3 is default, `pip install -r requirements.txt`. This will install all the required libraries.

**For MacOS:**
* Open the terminal.
* Install *pip* for python 3 using the command `sudo easy_install pip3`.
* Inside the terminal, go to the *SRIP* folder or open a new terminal inside the *SRIP* folder.
* Run the command `pip3 install -r requirements.txt`. This will install all the required libraries.

**For Windows:**
* Install the latest version of Python 3 by downloading the installer from the official site: https://www.python.org/downloads/. While installing, be sure to check the option for adding the path of Python 3 to the environment variable.
* Open the command prompt or powershell inside the SRIP folder. 
* Run the command `pip install -r requirements.txt`. This will install all the required libraries.

## 2. Starting the server:
--------------------------

* Open the *Codes* folder inside the *SRIP* folder.
* Inside, there is a file named `main_server_script.py`. Open the terminal/cmd/powershell in the current folder and execute the command `python main_server_script.py`.
* The server will start running and a link will appear. Copy this link and open it inside a web browser or click on the link while holding down the `Ctrl` key on the keyboard. The experiment will start running inside the browser.
* After the work is done, press `Ctrl+C` inside the terminal/cmd/powershell to close the server.