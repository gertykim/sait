<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['Логин'];
    $password = $_POST['Пароль'];

    // Откройте файл для записи данных в базу данных (в данном случае, файл bd.sql)
    $file = fopen("bd.sql", "a");
    if ($file) {
        // Запишите данные в файл SQL
        fwrite($file, "INSERT INTO users (username, password) VALUES ('$username', '$password');\n");
        fclose($file);
        echo "Данные успешно сохранены!";
    } else {
        echo "Ошибка при открытии файла.";
    }
} else {
    echo "Недопустимый запрос.";
}
header("Location: index.html");
exit();
?>
