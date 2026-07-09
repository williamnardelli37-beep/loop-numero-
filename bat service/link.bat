@echo off
setlocal enabledelayedexpansion
title Loop 26 - Optimizer 1.0
color 0A

:: VERIFICAÇÃO DE ADMINISTRADOR
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ========================================================
    echo   ERRO: EXECUTE COMO ADMINISTRADOR loopweb.company 
    echo ========================================================
    pause
    exit
)

:menu
cls
echo ========================================================
echo  loop.web.company service link
echo ========================================================
echo ========================================================
echo    SISTEMA DE AUDITORIA E MANUTENCAO Loop Optimizer 
echo ========================================================
echo  [F] Desligar            [R] Reiniciar
echo  [S] Suspender           [X] FORMATAR / RECUPERAR PC
echo.
echo  [U] ATUALIZAR WINDOWS   [D] ATUALIZAR DRIVERS (FORCAR)
echo  [T] TEMPERATURA         [H] HARDWARE COMPLETO
echo  [I] REDE / IP / PING    [L] LIMPEZA TOTAL (TEMP)
echo  [A] AVALIADOR DE IDADE  [B] BENCHMARK COM SCORE
echo  [M] DEEP SCAN MALWARE   [Q] Sair
echo ========================================================
echo.

choice /c FRSXUDTHILABMQ /n /m "Escolha uma opcao: "

if errorlevel 14 exit
if errorlevel 13 goto scan_malware
if errorlevel 12 goto benchmark
if errorlevel 11 goto avaliador
if errorlevel 10 goto limpar
if errorlevel 9 goto rede_ip
if errorlevel 8 goto hardware_detalhado
if errorlevel 7 goto temperatura_cpu
if errorlevel 6 goto atualizar_drivers
if errorlevel 5 goto atualizar_pc
if errorlevel 4 goto formatar_pc
if errorlevel 3 goto hiberne
if errorlevel 2 goto reboot
if errorlevel 1 goto poweroff
goto menu

:atualizar_pc
cls
echo ========================================================
echo           WINDOWS UPDATE - INSTALACAO REAL
echo ========================================================
echo [!] Deseja buscar e INSTALAR atualizacoes agora?
echo.
set /p "confUpdate=Pressione [Y] para sim ou [N] para voltar: "
if /i "%confUpdate%" neq "Y" goto menu

echo.
echo [+] Iniciando busca e download (pode demorar)...
echo [+] O sistema pode reiniciar automaticamente se necessario.
echo.

:: Script PowerShell que faz a busca, download e instalacao silenciosa
powershell -command "$updateSession = New-Object -ComObject Microsoft.Update.Session; $updateSearcher = $updateSession.CreateUpdateSearcher(); Write-Host 'Verificando servidore da Microsoft...'; $searchResult = $updateSearcher.Search('IsInstalled=0 and Type=''Software'''); if ($searchResult.Updates.Count -gt 0) { Write-Host 'Encontradas' $searchResult.Updates.Count 'atualizacoes. Baixando...'; $downloader = $updateSession.CreateUpdateDownloader(); $downloader.Updates = $searchResult.Updates; $downloader.Download(); Write-Host 'Instalando...'; $installer = $updateSession.CreateUpdateInstaller(); $installer.Updates = $searchResult.Updates; $result = $installer.Install(); Write-Host 'Instalacao concluida.' -ForegroundColor Green } else { Write-Host 'Nenhuma atualizacao pendente.' -ForegroundColor Cyan }"

echo.
pause
goto menu

:atualizar_drivers
cls
echo ========================================================
echo           ATUALIZACAO FORCADA DE DRIVERS
echo ========================================================
echo [!] Deseja forcar a atualizacao de drivers?
set /p "confDriver=Pressione [Y] para sim ou [N] para voltar: "
if /i "%confDriver%" neq "Y" goto menu
echo.
echo [+] Escaneando hardware e forçando atualizacoes...
pnputil /scan-devices
pnputil /update-drivers *
echo.
pause
goto menu

:hardware_detalhado
cls
echo ========================================================
echo           DETALHES COMPLETOS DO HARDWARE
echo ========================================================
echo.
echo [+] PROCESSADOR:
wmic cpu get name, numberofcores /value
echo.
echo [+] MEMORIA RAM (GERACAO):
powershell -command "$mem = Get-CimInstance Win32_PhysicalMemory; foreach($m in $mem){ $gen='Desconhecido'; if($m.SMBIOSMemoryType -eq 24){$gen='DDR3'}elseif($m.SMBIOSMemoryType -eq 26){$gen='DDR4'}elseif($m.SMBIOSMemoryType -eq 34){$gen='DDR5'}; Write-Host 'Slot:' $m.DeviceLocator '|' ([math]::round($m.Capacity/1GB,0)) 'GB' $gen '-' $m.Speed 'MHz' -FC Cyan }"
echo.
echo [+] ARMAZENAMENTO E TELA:
powershell -command "Get-PhysicalDisk | Select-Object FriendlyName, MediaType, @{N='GB';E={[math]::round($_.Size/1GB,2)}} | FT"
powershell -command "Get-CimInstance Win32_VideoController | Select-Object Name, @{N='Res';E={$_.CurrentHorizontalResolution.ToString()+'x'+$_.CurrentVerticalResolution.ToString()}}, CurrentRefreshRate | FT"
pause
goto menu

:limpar
cls
echo [!] Removendo e recriando pastas temporarias...
taskkill /f /im explorer.exe >nul 2>&1
rd /s /q "%temp%" >nul 2>&1 & mkdir "%temp%"
rd /s /q "C:\Windows\Temp" >nul 2>&1 & mkdir "C:\Windows\Temp"
start explorer.exe
echo [OK] Limpeza concluida.
pause
goto menu

:scan_malware
cls
echo [!] Deep Scan (Windows Defender Engine)...
"C:\Program Files\Windows Defender\MpCmdRun.exe" -Scan -ScanType 1
pause
goto menu

:temperatura_cpu
cls
powershell -command "$t = Get-WmiObject -Namespace root/wmi -Class MSAcpi_ThermalZoneTemperature -ErrorAction SilentlyContinue; if($t){ foreach($item in $t){ Write-Host 'CPU Temp:' (($item.CurrentTemperature / 10) - 273.15) 'C' -FC Yellow } } else { Write-Host 'Sensores bloqueados.' -FC Red }"
pause
goto menu

:avaliador
cls
powershell -command "$b = Get-CimInstance Win32_BIOS; $idade = [math]::truncate(((Get-Date) - $b.ReleaseDate).Days / 365); Write-Host 'Idade da Placa:' $idade 'anos.' -FC Yellow"
pause
goto menu

:formatar_pc
shutdown /r /o /f /t 00
goto menu

:rede_ip
ipconfig | findstr "IPv4"
pause
goto menu

:benchmark
powershell -command "$start=Get-Date; 1..50000 | %% {[math]::sqrt($_)}; Write-Host 'Tempo:' ((Get-Date)-$start).TotalSeconds 's'"
pause
goto menu

:poweroff
shutdown /s /t 30
:reboot
shutdown /r /t 0
:hiberne
rundll32.exe powrprof.dll,SetSuspendState 0,1,0
goto menu
@REM ============================================================
@REM    LOOP WEB BAT 2025-2026 SERVICE
@REM    FRAMEWORK: LOOP 26 - AESTHETIC EDITION (OFFICIAL)
@REM    DESCRIÇÃO: Design focado em Hiper-Minimalismo e Glassmorphism.
@REM    ============================================================ 