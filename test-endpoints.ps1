# Script de test des endpoints utilisateurs
# Assurez-vous que le serveur NestJS tourne sur http://localhost:3000

$baseUrl = "http://localhost:3000"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "TESTS POUR ROLE CLIENT" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "1. GET /users avec header x-user-role: client" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users" -Headers @{"x-user-role"="client"} -Method Get
    Write-Host "Réponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Erreur: $_" -ForegroundColor Red
}

Write-Host "`n2. GET /users?role=client" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users?role=client" -Method Get
    Write-Host "Réponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Erreur: $_" -ForegroundColor Red
}

Write-Host "`n3. GET /users/filter/by-role?role=client" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users/filter/by-role?role=client" -Method Get
    Write-Host "Réponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Erreur: $_" -ForegroundColor Red
}

Write-Host "`n4. GET /client/users" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/client/users" -Method Get
    Write-Host "Réponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Erreur: $_" -ForegroundColor Red
}

Write-Host "`n`n========================================" -ForegroundColor Cyan
Write-Host "TESTS POUR ROLE ADMIN" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "5. GET /users avec header x-user-role: admin" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users" -Headers @{"x-user-role"="admin"} -Method Get
    Write-Host "Réponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Erreur: $_" -ForegroundColor Red
}

Write-Host "`n6. GET /admin/users avec header x-user-role: admin" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/admin/users" -Headers @{"x-user-role"="admin"} -Method Get
    Write-Host "Réponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Erreur: $_" -ForegroundColor Red
}

Write-Host "`n`n========================================" -ForegroundColor Cyan
Write-Host "TESTS REQUÊTES AVANCÉES" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "7. GET /users/inactive/six-months (utilisateurs non mis à jour depuis 6 mois)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users/inactive/six-months" -Method Get
    Write-Host "Réponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Erreur: $_" -ForegroundColor Red
}

Write-Host "`n8. GET /admin/users/inactive/six-months" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/admin/users/inactive/six-months" -Headers @{"x-user-role"="admin"} -Method Get
    Write-Host "Réponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Erreur: $_" -ForegroundColor Red
}

Write-Host "`n9. GET /users/advanced/filters?role=user&active=true" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users/advanced/filters?role=user&active=true" -Method Get
    Write-Host "Réponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Erreur: $_" -ForegroundColor Red
}

Write-Host "`n10. GET /users/advanced/filters?active=false" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users/advanced/filters?active=false" -Method Get
    Write-Host "Réponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Erreur: $_" -ForegroundColor Red
}

$sixMonthsAgo = (Get-Date).AddMonths(-6).ToString("yyyy-MM-dd")
Write-Host "`n11. GET /users/advanced/filters?updatedBefore=$sixMonthsAgo" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users/advanced/filters?updatedBefore=$sixMonthsAgo" -Method Get
    Write-Host "Réponse:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Erreur: $_" -ForegroundColor Red
}

Write-Host "`n`n========================================" -ForegroundColor Cyan
Write-Host "TESTS TERMINÉS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
