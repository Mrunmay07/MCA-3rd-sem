-- step 1 : Check current user
SELECT current_user , current_database()


-- step 2: Create students table
CREATE TABLE students(
	student_id INT PRIMARY KEY,
	student_name VARCHAR(50) NOT NULL,
	marks INT NOT NULL
)

-- step 3 : Insert data into students 
INSERT INTO public.students
    (student_id, student_name, marks)
VALUES
    (1, 'Rahul', 80),
    (2, 'Shivam', 85),
    (3, 'Lokesh', 75),
    (4, 'Pratham', 90);


SELECT * FROM students


-- step 4 : Create role -> teacher_role , student_role -> NOLOGIN
-- in roles mein hum permissions denge
-- teacher_role -> saare teachers ko common permissions dega
-- student_role -> saare students ko common permissions dega
CREATE ROLE teacher_role NOLOGIN;
CREATE ROLE student_role NOLOGIN;


-- Schema and table permissions assign
-- Isse dono roles ko public schema mein objects access karne ke liye required
-- schema permission milti hai.
GRANT USAGE 
ON SCHEMA public 
TO teacher_role , student_role


-- Grant : UPDATE , SELECT permissions to teacher_role
GRANT SELECT , UPDATE 
ON TABLE public.students
TO teacher_role

-- Grant : SELECT permission to student_role
GRANT SELECT 
ON TABLE public.students 
TO student_role


-- Verify 
SELECT
    grantee,
    privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND table_name = 'students'
  AND grantee IN ('teacher_role', 'student_role')
ORDER BY grantee, privilege_type;


-- step 5 : Create login accounts and give permissions to those accounts 
CREATE ROLE anshul 
WITH LOGIN PASSWORD 'anshul123'

CREATE ROLE rishabh
WITH LOGIN PASSWORD 'rishabh123'


-- step 6 : Grant teacher_role to these accounts 
GRANT teacher_role TO anshul;
GRANT teacher_role TO rishabh;


-- verify
SELECT
    member.rolname AS login_account,
    granted.rolname AS assigned_role
FROM pg_auth_members AS m
JOIN pg_roles AS member
    ON member.oid = m.member
JOIN pg_roles AS granted
    ON granted.oid = m.roleid
WHERE member.rolname IN ('anshul', 'rishabh');



-- step 7 : Student login accounts create 
CREATE ROLE rahul 
WITH LOGIN PASSWORD 'rahul123'

CREATE ROLE shivam 
WITH LOGIN PASSWORD 'shivam23'

CREATE ROLE lokesh
WITH LOGIN PASSWORD 'lokesh123'

CREATE ROLE pratham
WITH LOGIN PASSWORD 'pratham123'


-- step 8 : Grant student_role to student accounts 
GRANT student_role TO rahul;
GRANT student_role TO shivam;
GRANT student_role TO lokesh;
GRANT student_role TO pratham;

-- Verify
SELECT
    member.rolname AS login_account,
    granted.rolname AS assigned_role
FROM pg_auth_members AS m
JOIN pg_roles AS member
    ON member.oid = m.member
JOIN pg_roles AS granted
    ON granted.oid = m.roleid
WHERE member.rolname IN (
    'rahul', 'shivam', 'lokesh', 'pratham'
)
ORDER BY member.rolname;





-- Till now 
-- teacher_role ko sirf students table par permission hai 

-- lets create  a teachers table and give permission to access this table 
-- aswell
CREATE TABLE public.teachers (
    teacher_id INT PRIMARY KEY,
    teacher_name VARCHAR(50) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    salary NUMERIC(10, 2) NOT NULL
);


INSERT INTO public.teachers
    (teacher_id, teacher_name, subject, salary)
VALUES
    (1, 'Anshul', 'PostgreSQL', 45000.00),
    (2, 'Rishabh', 'Node.js', 42000.00),
    (3, 'Priya', 'DBMS', 48000.00);


-- Grant permission 
-- Teachers can read and update both tables
GRANT SELECT, UPDATE
ON TABLE public.students, public.teachers
TO teacher_role;

-- Students can only read both tables
GRANT SELECT
ON TABLE public.students, public.teachers
TO student_role;





-- implementing RLS (Row level security)

ALTER TABLE public.students
ENABLE ROW LEVEL SECURITY

-- Verify if its enabled 
SELECT
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'students';


-- lets create a RLS policy for Rahul 
CREATE POLICY rahul_select_own_record
ON public.students
FOR SELECT
TO rahul                          -- policy rahul role ke liye hai
USING (student_name = 'Rahul');   -- sirf wahi rows visible hongi jinka student
									-- name = Rahul hoga


-- same policy for every student
CREATE POLICY student_select_own_record
ON public.students
FOR SELECT
TO student_role
USING (
    student_name = CASE current_user
        WHEN 'rahul'   THEN 'Rahul'
        WHEN 'shivam'  THEN 'Shivam'
        WHEN 'lokesh'  THEN 'Lokesh'
        WHEN 'pratham' THEN 'Pratham'
    END	
);


-- Drop the old policy of Rahul
DROP POLICY rahul_select_own_record
ON public.students;









-- What if i have 1000+ users , how will i assign policy then ? 
CREATE TABLE public.app_users (
    db_role_name TEXT PRIMARY KEY,
    student_id INT UNIQUE
        REFERENCES public.students(student_id)
);

INSERT INTO public.app_users
    (db_role_name, student_id)
VALUES
    ('rahul', 1),
    ('shivam', 2),
    ('lokesh', 3),
    ('pratham', 4);

DROP POLICY student_select_own_record
ON public.students;


CREATE POLICY student_select_own_record
ON public.students
FOR SELECT
TO student_role
USING (
    student_id = (
        SELECT au.student_id
        FROM public.app_users AS au
        WHERE au.db_role_name = current_user
    )
);



GRANT SELECT
ON TABLE public.app_users
TO student_role;
