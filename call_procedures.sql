CREATE PROCEDURE InsertTeacher(@firstname nvarchar(30), @lastname nvarchar(30), @email varchar(100))
BEGIN
	INSERT INTO teachers (firstname, lastname, email) VALUES (@firstname, @lastname, @email)
END

---

CREATE PROCEDURE AverageGradeByTeacherId(@id int)
BEGIN
	SELECT AVG(grade) FROM achievements WHERE teacher_id = 1;
END

---

CREATE PROCEDURE AverageGradeByTeacherName(@firstname nvarchar(30), @lastname nvarchar(30))
BEGIN
SELECT 
	teacher_id, 
	AVG(grade) AS average_grade
FROM 
	achievements 
WHERE 
	teacher_id = (SELECT id FROM teachers WHERE firstname = @firstname and lastname = @lastname);
END