
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    PhoneNumber VARCHAR(20),
    Address VARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Cakes (
    CakeID INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100),
    Description TEXT,
    Price DECIMAL(10, 2),
    IsAvailable BIT DEFAULT 1
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    CustomerID INT,
    OrderDate DATETIME DEFAULT GETDATE(),
    DeliveryDate DATE,
    TotalAmount DECIMAL(10, 2),
    Status VARCHAR(20) CHECK (Status IN ('Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled')) DEFAULT 'Pending',
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT,
    CakeID INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    TotalPrice AS (Quantity * Price) PERSISTED,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (CakeID) REFERENCES Cakes(CakeID)
);

CREATE TABLE Deliveries (
    DeliveryID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT,
    DeliveryAddress VARCHAR(255),
    DeliveryDate DATE,
    DeliveredBy VARCHAR(50),
    Status VARCHAR(20) CHECK (Status IN ('Scheduled', 'Out for Delivery', 'Delivered', 'Failed')) DEFAULT 'Scheduled',
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

CREATE TABLE Payments (
    PaymentID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT,
    PaymentDate DATETIME DEFAULT GETDATE(),
    Amount DECIMAL(10, 2),
    PaymentMethod VARCHAR(20) CHECK (PaymentMethod IN ('Credit Card', 'Debit Card', 'Cash', 'Mobile Payment', 'Bank Transfer')) DEFAULT 'Cash',
    PaymentStatus VARCHAR(20) CHECK (PaymentStatus IN ('Pending', 'Completed', 'Failed')) DEFAULT 'Pending',
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Role VARCHAR(20) CHECK (Role IN ('Delivery Driver', 'Customer Service', 'Manager', 'Baker')) DEFAULT 'Baker',
    PhoneNumber VARCHAR(20),
    Email VARCHAR(100) UNIQUE
);

CREATE TABLE Login (
    LoginID INT PRIMARY KEY IDENTITY(1,1),
    Username VARCHAR(50) UNIQUE NOT NULL,
    PasswordHash VARBINARY(64),
    Role VARCHAR(20) CHECK (Role IN ('Admin', 'Employee')) NOT NULL, 
    CreatedAt DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1 
);

CREATE TABLE Registration (
    RegistrationID INT PRIMARY KEY IDENTITY(1,1),
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL, 
    PhoneNumber VARCHAR(15) NULL,
    Role VARCHAR(20) CHECK (Role IN ('Admin', 'Employee')) NOT NULL,
    Status VARCHAR(20) CHECK (Status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending', -- Status of registration
    CreatedAt DATETIME DEFAULT GETDATE()
);

INSERT INTO Registration (FullName, Email, PhoneNumber, Role)
VALUES ('John Doe', 'john.doe@example.com', '+2547-456-7890', 'Employee');