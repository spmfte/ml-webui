import os
import subprocess
import sys

def create_virtual_environment(env_name="yolo-webui-venv", python_version="python3.11"):
    """Create a virtual environment with the given name using a specific Python version."""
    print("Creating virtual environment...")
    subprocess.run([python_version, "-m", "venv", env_name], check=True)
    print(f"Virtual environment '{env_name}' created using {python_version}.")

def activate_virtual_environment(env_name="yolo-webui-venv"):
    """Activate the virtual environment on Linux and macOS."""
    activate_script = f"./{env_name}/bin/activate"
    print(f"Activating the virtual environment '{env_name}'...")
    os.system(f"source {activate_script}")
    print(f"Virtual environment '{env_name}' activated.")

def install_python_dependencies(requirements_file="requirements.txt", env_name="yolo-webui-venv"):
    """Install Python dependencies from a requirements.txt file."""
    print("Installing Python dependencies...")
    python_executable = f"./{env_name}/bin/python"
    subprocess.run([python_executable, "-m", "pip", "install", "-r", requirements_file], check=True)
    print("Python dependencies installed.")

def install_javascript_dependencies():
    """Install JavaScript dependencies from package.json."""
    print("Installing JavaScript dependencies...")
    subprocess.run(["npm", "install"], check=True)
    print("JavaScript dependencies installed.")

def setup_project():
    env_name = "yolo-webui-venv"
    requirements_file = "requirements.txt"
    python_version = "python3.11"  # Specify the Python version

    create_virtual_environment(env_name, python_version)
    activate_virtual_environment(env_name)
    install_python_dependencies(requirements_file, env_name)
    install_javascript_dependencies()

def run_start_script():
    response = input("Do you want to run the start.sh script? [Y/n] ")
    if response.lower() in ['y', 'yes', '']:
        os.system("chmod +x start.sh")
        os.system("./start.sh")
    else:
        print("Skipping start.sh script.")

if __name__ == "__main__":
    setup_project()
    run_start_script()
