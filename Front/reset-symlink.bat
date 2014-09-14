SET mypath=%~dp0

RD /S /Q %mypath%..\assets 
mklink /D %mypath%..\assets %mypath%..\App\dist\assets\ 

echo "Hello " + %mypath%