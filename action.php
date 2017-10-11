<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Sent Data</title>
</head>
<body>
  <h1>To są przesłane zmienne:</h1>
  <?php 
  
    $data = $_POST;
    print("<p>Imie: " . $data["inputName"] . "</p>");
    print("<p>Nazwisko: " . $data["inputSurname"] . "</p>");
    print("<p>Email: " . $data["inputEmail"] . "</p>");
    print("<p>Hasło: ***** </p>");
    print("<p>Data urodzenia: " . $data["birthDate"] . "</p>");
    print("<p>PESEL: " . $data["PESEL"] . "</p>");
  
  ?>
</body>
</html>