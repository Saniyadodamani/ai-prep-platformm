import mongoose from "mongoose";
import dotenv from "dotenv";
import Theory from "./models/Theory.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB Connected ");

// 150 MCQ Questions: 5 topics × 30 questions (10 Easy, 10 Medium, 10 Hard)
// Topics: Operating Systems, DBMS, Computer Networks, OOPS, Behavioral
const theoryQuestions = [
  // ============================================
  // TOPIC 1: OOPS
  // ============================================
  // Easy (10)
  {
    topic: "OOPS",
    questionNumber: 1,
    question: "What is a class in Object-Oriented Programming?",
    options: ["A data structure", "A blueprint for creating objects", "A variable type", "A memory allocation"],
    correctOptionIndex: 1,
    explanation: "A class is a blueprint or template for creating objects that have specific properties and methods.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 2,
    question: "What is encapsulation?",
    options: ["Grouping data and methods", "Hiding internal details and exposing API", "Inheritance mechanism", "Data sorting"],
    correctOptionIndex: 1,
    explanation: "Encapsulation bundles data with methods and hides internal implementation details.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 3,
    question: "What is inheritance?",
    options: ["Creating copies", "Acquiring properties from parent class", "Method overloading", "Interface implementation"],
    correctOptionIndex: 1,
    explanation: "Inheritance allows a class to inherit properties and methods from a parent class.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 4,
    question: "What is polymorphism?",
    options: ["Multiple classes", "Ability to take multiple forms", "Data hiding", "Method parameters"],
    correctOptionIndex: 1,
    explanation: "Polymorphism allows objects to take multiple forms through method overriding and overloading.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 5,
    question: "What is an abstract class?",
    options: ["A concrete class", "Class with abstract methods that cannot be instantiated", "Base class", "Data structure"],
    correctOptionIndex: 1,
    explanation: "Abstract class contains abstract methods and cannot be instantiated directly.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 6,
    question: "What is an interface?",
    options: ["A class", "A contract defining methods without implementation", "A data type", "A variable"],
    correctOptionIndex: 1,
    explanation: "Interface defines a contract of methods that implementing classes must follow.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 7,
    question: "What is a constructor?",
    options: ["A method", "A special method to initialize objects", "A variable", "A static method"],
    correctOptionIndex: 1,
    explanation: "Constructor is a special method called when an object is created to initialize its properties.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 8,
    question: "What does 'static' keyword mean?",
    options: ["Unchangeable", "Belongs to class, not instance", "Cannot be modified", "Memory allocation"],
    correctOptionIndex: 1,
    explanation: "Static members belong to the class itself, not to individual instances.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 9,
    question: "What is method overloading?",
    options: ["Redefining methods", "Same method name with different parameters", "Inheriting methods", "Hiding methods"],
    correctOptionIndex: 1,
    explanation: "Method overloading allows multiple methods with same name but different parameters.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 10,
    question: "What is method overriding?",
    options: ["Creating duplicate methods", "Implementing parent's method in child class", "Hiding methods", "Parameter change"],
    correctOptionIndex: 1,
    explanation: "Method overriding occurs when child class implements a method from parent class.",
    difficulty: "Easy"
  },
  // Medium (10)
  {
    topic: "OOPS",
    questionNumber: 11,
    question: "What is the difference between composition and inheritance?",
    options: ["Same thing", "Composition: has-a relationship, Inheritance: is-a relationship", "Speed difference", "Memory difference"],
    correctOptionIndex: 1,
    explanation: "Inheritance is 'is-a' relationship, composition is 'has-a' relationship.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 12,
    question: "What is multiple inheritance?",
    options: ["Inheriting from one class", "Inheriting from multiple classes", "Single inheritance", "No inheritance"],
    correctOptionIndex: 1,
    explanation: "Multiple inheritance allows a class to inherit from multiple parent classes.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 13,
    question: "What is the diamond problem?",
    options: ["Shape issue", "Ambiguity in multiple inheritance", "Method issue", "No problem"],
    correctOptionIndex: 1,
    explanation: "Diamond problem occurs in multiple inheritance when a class inherits from two classes with common parent.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 14,
    question: "What is SOLID principle?",
    options: ["Type of material", "Set of design principles for OOP", "Programming language", "Data structure"],
    correctOptionIndex: 1,
    explanation: "SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 15,
    question: "What is a design pattern?",
    options: ["Visual design", "Reusable solution to common problems", "Color scheme", "Layout pattern"],
    correctOptionIndex: 1,
    explanation: "Design patterns are reusable solutions to common design problems.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 16,
    question: "What is the difference between 'static' and 'final' keyword?",
    options: ["No difference", "static: class-level, final: cannot be changed", "Speed difference", "Memory difference"],
    correctOptionIndex: 1,
    explanation: "static members are class-level, final variables/methods cannot be overridden.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 17,
    question: "What is a getter and setter?",
    options: ["Array operations", "Methods to access and modify private variables", "Loop constructs", "Data types"],
    correctOptionIndex: 1,
    explanation: "Getters and setters provide controlled access to private class variables.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 18,
    question: "What is 'this' keyword?",
    options: ["Loop keyword", "Reference to current object", "Conditional keyword", "Declaration keyword"],
    correctOptionIndex: 1,
    explanation: "'this' refers to the current object instance and its members.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 19,
    question: "What is a virtual function?",
    options: ["Imaginary function", "Function that can be overridden in derived class", "Hidden function", "Static function"],
    correctOptionIndex: 1,
    explanation: "Virtual function allows runtime polymorphism through dynamic dispatch.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 20,
    question: "What is coupling?",
    options: ["Joining things", "Dependencies between classes", "Class relationships", "Data types"],
    correctOptionIndex: 1,
    explanation: "Coupling measures how dependent one class is on another.",
    difficulty: "Medium"
  },
  // Hard (10)
  {
    topic: "OOPS",
    questionNumber: 21,
    question: "What is the difference between Liskov Substitution Principle and Interface Segregation?",
    options: ["Same principle", "LSP: subtype compatibility, ISP: client-specific interfaces", "No difference", "Name only"],
    correctOptionIndex: 1,
    explanation: "LSP ensures derived classes can substitute base classes; ISP advocates for specific interfaces.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 22,
    question: "What is a factory pattern?",
    options: ["Real factory", "Creational pattern for object creation", "Structural pattern", "Behavioral pattern"],
    correctOptionIndex: 1,
    explanation: "Factory pattern provides interface for creating objects without specifying exact classes.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 23,
    question: "What is a singleton pattern?",
    options: ["Single class", "Pattern ensuring only one instance exists", "Multiple inheritance", "Composition"],
    correctOptionIndex: 1,
    explanation: "Singleton pattern restricts class to have only one instance.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 24,
    question: "What is the observer pattern?",
    options: ["Data pattern", "Behavioral pattern for loose coupling between objects", "Structural pattern", "Creational pattern"],
    correctOptionIndex: 1,
    explanation: "Observer pattern defines one-to-many relationship between objects.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 25,
    question: "What is the strategy pattern?",
    options: ["Battle strategy", "Defines family of interchangeable algorithms", "Game pattern", "Data pattern"],
    correctOptionIndex: 1,
    explanation: "Strategy pattern encapsulates algorithms as objects for interchangeability.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 26,
    question: "What is the decorator pattern?",
    options: ["Visual decoration", "Adds responsibilities to objects dynamically", "Static pattern", "Fixed behavior"],
    correctOptionIndex: 1,
    explanation: "Decorator pattern adds new functionality to objects without modifying classes.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 27,
    question: "What is contravariance?",
    options: ["Type variance", "Parameter types can be more general in subtypes", "Return type variance", "No variance"],
    correctOptionIndex: 1,
    explanation: "Contravariance allows more general parameter types in derived methods.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 28,
    question: "What is covariance?",
    options: ["Multiple variance", "Return types can be more specific in subtypes", "Parameter variance", "No variance"],
    correctOptionIndex: 1,
    explanation: "Covariance allows more specific return types in derived methods.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 29,
    question: "What is the template method pattern?",
    options: ["Template design", "Defines algorithm skeleton in base class", "Configuration pattern", "Format pattern"],
    correctOptionIndex: 1,
    explanation: "Template method defines algorithm steps in base class, allowing overrides.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 30,
    question: "What is cohesion?",
    options: ["Grouping", "Degree to which class functionality is related", "Coupling measure", "Inheritance level"],
    correctOptionIndex: 1,
    explanation: "High cohesion means class methods are strongly related and focused.",
    difficulty: "Hard"
  },

  // ============================================
  // TOPIC 2: DBMS
  // ============================================
  // Easy (10)
  {
    topic: "DBMS",
    questionNumber: 31,
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Language", "Sequential Query Language", "Strong Query Language"],
    correctOptionIndex: 0,
    explanation: "SQL stands for Structured Query Language used to interact with databases.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 32,
    question: "Which of the following is NOT a type of database?",
    options: ["Relational", "NoSQL", "Document", "Functional"],
    correctOptionIndex: 3,
    explanation: "Functional is a programming paradigm, not a database type.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 33,
    question: "Primary Key is used to _____.",
    options: ["Sort records", "Uniquely identify each record", "Encrypt data", "Delete records"],
    correctOptionIndex: 1,
    explanation: "Primary Key uniquely identifies each record in a table.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 34,
    question: "Foreign Key is used for _____.",
    options: ["Duplicate data", "Create relationships between tables", "Improve performance", "Secure data"],
    correctOptionIndex: 1,
    explanation: "Foreign Key creates relationships between tables in relational databases.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 35,
    question: "Which normal form removes transitive dependencies?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctOptionIndex: 2,
    explanation: "3rd Normal Form (3NF) removes transitive dependencies.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 36,
    question: "What is an index in a database?",
    options: ["A backup copy", "A data structure to speed up queries", "A table separator", "A security feature"],
    correctOptionIndex: 1,
    explanation: "Index is a data structure that improves query performance.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 37,
    question: "ACID properties ensure _____.",
    options: ["Data consistency", "Query performance", "User access", "Backup"],
    correctOptionIndex: 0,
    explanation: "ACID (Atomicity, Consistency, Isolation, Durability) ensures data integrity.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 38,
    question: "A JOIN operation combines data from _____.",
    options: ["One table", "Multiple tables", "One row", "One column"],
    correctOptionIndex: 1,
    explanation: "JOIN combines records from multiple tables based on related columns.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 39,
    question: "What is the difference between INNER JOIN and LEFT JOIN?",
    options: ["Speed", "INNER returns common, LEFT includes unmatched", "Same thing", "Column order"],
    correctOptionIndex: 1,
    explanation: "INNER JOIN returns only matching records, LEFT JOIN includes unmatched left table records.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 40,
    question: "Denormalization is done to _____.",
    options: ["Reduce redundancy", "Improve query performance", "Remove data", "Save storage"],
    correctOptionIndex: 1,
    explanation: "Denormalization intentionally adds redundancy to improve performance.",
    difficulty: "Easy"
  },
  // Medium (10)
  {
    topic: "DBMS",
    questionNumber: 41,
    question: "What is a database transaction?",
    options: ["Data backup", "Series of SQL operations treated as one unit", "User login", "Query result"],
    correctOptionIndex: 1,
    explanation: "Transaction is a sequence of operations that either all succeed or all fail.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 42,
    question: "Deadlock in database occurs when _____.",
    options: ["Database crashes", "Two transactions wait for each other indefinitely", "Query times out", "User disconnects"],
    correctOptionIndex: 1,
    explanation: "Deadlock occurs when two or more transactions wait for resources held by each other.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 43,
    question: "What is a view in database?",
    options: ["Physical table copy", "Virtual table based on SQL query", "Backup file", "Log file"],
    correctOptionIndex: 1,
    explanation: "View is a virtual table derived from one or more actual tables.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 44,
    question: "Which isolation level prevents dirty reads?",
    options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
    correctOptionIndex: 1,
    explanation: "Read Committed prevents dirty reads but allows non-repeatable reads.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 45,
    question: "What is a trigger in database?",
    options: ["A query", "Code executed automatically on specified events", "An index", "A view"],
    correctOptionIndex: 1,
    explanation: "Trigger is a special kind of stored procedure that executes in response to events.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 46,
    question: "B-tree index is used in databases because _____.",
    options: ["It's fastest", "It keeps data sorted and balanced", "It uses least storage", "It's simple"],
    correctOptionIndex: 1,
    explanation: "B-tree maintains balance and sorted order for efficient search and range queries.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 47,
    question: "What is the difference between clustered and non-clustered index?",
    options: ["Speed only", "Clustered determines physical order, non-clustered doesn't", "No difference", "Storage"],
    correctOptionIndex: 1,
    explanation: "Clustered index determines physical order of rows, non-clustered creates separate structure.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 48,
    question: "Query optimization is done by _____.",
    options: ["Manual coding", "Query optimizer/planner", "DBA only", "Indexing only"],
    correctOptionIndex: 1,
    explanation: "Database query optimizer analyzes queries and determines optimal execution plans.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 49,
    question: "What is eventual consistency?",
    options: ["Always consistent", "Consistency after some time", "Never consistent", "User defined"],
    correctOptionIndex: 1,
    explanation: "Eventual consistency means data becomes consistent after some time period.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 50,
    question: "CAP theorem states databases can't have all three: Consistency, Availability, and _____.",
    options: ["Atomicity", "Partition tolerance", "Isolation", "Durability"],
    correctOptionIndex: 1,
    explanation: "CAP theorem: Consistency, Availability, Partition tolerance.",
    difficulty: "Medium"
  },
  // Hard (10)
  {
    topic: "DBMS",
    questionNumber: 51,
    question: "What is phantom read?",
    options: ["Reading deleted data", "Reading non-existent data", "Reading rows added by concurrent transaction", "Reading old data"],
    correctOptionIndex: 2,
    explanation: "Phantom read occurs when new rows are added by concurrent transactions.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 52,
    question: "Two-phase locking prevents which anomalies?",
    options: ["Dirty reads", "Non-repeatable reads", "Phantom reads", "All of above"],
    correctOptionIndex: 3,
    explanation: "2PL prevents dirty reads, non-repeatable reads, and phantom reads.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 53,
    question: "What is horizontal partitioning?",
    options: ["Splitting columns", "Splitting rows across tables", "Splitting databases", "Splitting indexes"],
    correctOptionIndex: 1,
    explanation: "Horizontal partitioning (sharding) splits rows across tables/servers.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 54,
    question: "MVCC provides _____.",
    options: ["Faster writes", "Concurrent reads without locks", "Better security", "Reduced storage"],
    correctOptionIndex: 1,
    explanation: "MVCC allows concurrent reads without locking by maintaining multiple versions.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 55,
    question: "What is query plan?",
    options: ["SQL syntax check", "Execution strategy for query", "Backup schedule", "Index list"],
    correctOptionIndex: 1,
    explanation: "Query plan is the execution strategy determined by the query optimizer.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 56,
    question: "Bitmap index is efficient for _____.",
    options: ["Numeric columns", "Low cardinality columns", "Text search", "Range queries"],
    correctOptionIndex: 1,
    explanation: "Bitmap indexes are efficient for columns with few distinct values.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 57,
    question: "What is the difference between mirroring and replication?",
    options: ["No difference", "Mirroring: failover, Replication: load distribution", "Different sync", "Different use"],
    correctOptionIndex: 1,
    explanation: "Mirroring is for failover, replication for load distribution.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 58,
    question: "What is cursor?",
    options: ["Part of UI", "Database pointer for iterating results", "Security feature", "Backup tool"],
    correctOptionIndex: 1,
    explanation: "Cursor is a database object to retrieve and manipulate rows one at a time.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 59,
    question: "Write-ahead logging ensures _____.",
    options: ["Performance", "Durability and recovery", "Security", "Compression"],
    correctOptionIndex: 1,
    explanation: "WAL ensures durability by logging changes before applying to database.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 60,
    question: "What is a stored procedure?",
    options: ["Query result", "SQL code stored in database for reuse", "Data backup", "Index type"],
    correctOptionIndex: 1,
    explanation: "Stored procedure is a set of SQL statements stored and executed in database.",
    difficulty: "Hard"
  },

  // ============================================
  // TOPIC 3: Computer Networks
  // ============================================
  // Easy (10)
  {
    topic: "Computer Networks",
    questionNumber: 61,
    question: "What does TCP stand for?",
    options: ["Transfer Control Protocol", "Transmission Control Protocol", "Transport Control Protocol", "Terminal Control"],
    correctOptionIndex: 1,
    explanation: "TCP stands for Transmission Control Protocol.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 62,
    question: "TCP is _____ whereas UDP is _____.",
    options: ["Reliable, unreliable", "Unreliable, reliable", "Connectionless, connection-oriented", "Fast, slow"],
    correctOptionIndex: 0,
    explanation: "TCP is connection-oriented and reliable; UDP is connectionless and unreliable.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 63,
    question: "What is DNS?",
    options: ["Data Network System", "Domain Name System", "Dynamic Network Service", "Digital Name Server"],
    correctOptionIndex: 1,
    explanation: "DNS translates domain names to IP addresses.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 64,
    question: "The OSI model has _____ layers.",
    options: ["5", "7", "9", "12"],
    correctOptionIndex: 1,
    explanation: "OSI model has 7 layers (Physical, Data Link, Network, Transport, Session, Presentation, Application).",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 65,
    question: "HTTP operates at which OSI layer?",
    options: ["Transport", "Network", "Application", "Session"],
    correctOptionIndex: 2,
    explanation: "HTTP operates at Layer 7 (Application layer).",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 66,
    question: "Subnet mask is used to _____.",
    options: ["Hide IP", "Identify network portion of IP", "Encrypt data", "Route packets"],
    correctOptionIndex: 1,
    explanation: "Subnet mask identifies which bits represent network vs host.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 67,
    question: "What is the default port for HTTP?",
    options: ["21", "22", "80", "443"],
    correctOptionIndex: 2,
    explanation: "HTTP uses port 80 by default.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 68,
    question: "HTTPS provides _____ over HTTP.",
    options: ["Speed", "Encryption and security", "Compression", "Load balancing"],
    correctOptionIndex: 1,
    explanation: "HTTPS adds encryption (SSL/TLS) to HTTP for secure communication.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 69,
    question: "What is an IP address?",
    options: ["A website URL", "A unique identifier for device on network", "A port number", "A domain name"],
    correctOptionIndex: 1,
    explanation: "IP address uniquely identifies a device on a network.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 70,
    question: "Router operates at which layer?",
    options: ["Data Link", "Network", "Transport", "Application"],
    correctOptionIndex: 1,
    explanation: "Router works at Layer 3 (Network layer) to forward packets between networks.",
    difficulty: "Easy"
  },
  // Medium (10)
  {
    topic: "Computer Networks",
    questionNumber: 71,
    question: "What is a MAC address?",
    options: ["PC identifier", "Physical address on LAN", "Website address", "Network gateway"],
    correctOptionIndex: 1,
    explanation: "MAC (Media Access Control) address identifies devices on local network.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 72,
    question: "ARP is used to map _____.",
    options: ["IP to physical address", "Ports to services", "Domains to IPs", "Hosts to domains"],
    correctOptionIndex: 0,
    explanation: "ARP (Address Resolution Protocol) maps IP addresses to MAC addresses.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 73,
    question: "What is the purpose of a firewall?",
    options: ["Increase speed", "Filter and control network traffic", "Cache data", "Compress packets"],
    correctOptionIndex: 1,
    explanation: "Firewall monitors and controls incoming/outgoing network traffic.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 74,
    question: "What is latency?",
    options: ["Bandwidth", "Packet loss", "Delay in data transmission", "Compression rate"],
    correctOptionIndex: 2,
    explanation: "Latency is the time delay for data to travel from source to destination.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 75,
    question: "Bandwidth refers to _____.",
    options: ["Delay in network", "Maximum data transmission rate", "Number of devices", "Packet size"],
    correctOptionIndex: 1,
    explanation: "Bandwidth is the capacity of a network link measured in bits per second.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 76,
    question: "What is a proxy server?",
    options: ["Main server", "Intermediary between client and server", "Backup server", "Web server"],
    correctOptionIndex: 1,
    explanation: "Proxy server acts as intermediary, forwarding requests and responses.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 77,
    question: "What is the purpose of NAT?",
    options: ["Encrypt data", "Translate private IPs to public IPs", "Route packets", "Cache DNS"],
    correctOptionIndex: 1,
    explanation: "NAT (Network Address Translation) allows private networks to access internet.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 78,
    question: "What is ICMP used for?",
    options: ["File transfer", "Email", "Diagnostics and error reporting", "Web browsing"],
    correctOptionIndex: 2,
    explanation: "ICMP (Internet Control Message Protocol) is used by ping and traceroute.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 79,
    question: "What is QoS?",
    options: ["Quality Of Service", "Quick Online Search", "Query Operating System", "Quantum System"],
    correctOptionIndex: 0,
    explanation: "QoS ensures priority and reliability for critical network traffic.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 80,
    question: "What is bandwidth throttling?",
    options: ["Speed boost", "Limiting data transmission rate", "Compression", "Encryption"],
    correctOptionIndex: 1,
    explanation: "Bandwidth throttling intentionally limits data transmission rate.",
    difficulty: "Medium"
  },
  // Hard (10)
  {
    topic: "Computer Networks",
    questionNumber: 81,
    question: "What is the three-way handshake in TCP?",
    options: ["SYN-SYN-ACK", "SYN-ACK-ACK", "SYN-ACK-SYN-ACK", "ACK-SYN-ACK"],
    correctOptionIndex: 1,
    explanation: "TCP handshake: SYN, SYN-ACK, ACK to establish connection.",
    difficulty: "Hard"
  },
  {
    topic: "Computer Networks",
    questionNumber: 82,
    question: "What is congestion control?",
    options: ["Speed limiting", "Reducing transmission rate to avoid congestion", "Packet priority", "Route selection"],
    correctOptionIndex: 1,
    explanation: "TCP adjusts transmission rate based on network congestion signals.",
    difficulty: "Hard"
  },
  {
    topic: "Computer Networks",
    questionNumber: 83,
    question: "What is slow start?",
    options: ["Delayed connection", "Exponential increase in congestion window", "Random window size", "Timeout"],
    correctOptionIndex: 1,
    explanation: "Slow Start exponentially increases TCP window until loss or threshold.",
    difficulty: "Hard"
  },
  {
    topic: "Computer Networks",
    questionNumber: 84,
    question: "IPv4 and IPv6 differ in _____.",
    options: ["Speed", "Address size (32-bit vs 128-bit)", "Reliability", "Price"],
    correctOptionIndex: 1,
    explanation: "IPv4 uses 32-bit addresses, IPv6 uses 128-bit addresses.",
    difficulty: "Hard"
  },
  {
    topic: "Computer Networks",
    questionNumber: 85,
    question: "What is DHCP used for?",
    options: ["Encryption", "Automatic IP assignment", "Packet routing", "Domain translation"],
    correctOptionIndex: 1,
    explanation: "DHCP automatically assigns IP addresses to network devices.",
    difficulty: "Hard"
  },
  {
    topic: "Computer Networks",
    questionNumber: 86,
    question: "What is the purpose of VPN?",
    options: ["Faster internet", "Secure encrypted tunnel over public network", "Ad blocking", "Cache management"],
    correctOptionIndex: 1,
    explanation: "VPN creates encrypted tunnel for secure remote access.",
    difficulty: "Hard"
  },
  {
    topic: "Computer Networks",
    questionNumber: 87,
    question: "BGP is used for _____.",
    options: ["File transfer", "Inter-domain routing", "Domain resolution", "Email delivery"],
    correctOptionIndex: 1,
    explanation: "BGP (Border Gateway Protocol) handles routing between autonomous systems.",
    difficulty: "Hard"
  },
  {
    topic: "Computer Networks",
    questionNumber: 88,
    question: "What is the difference between unicast and multicast?",
    options: ["No difference", "Unicast: one-to-one, Multicast: one-to-many", "Speed difference", "Protocol difference"],
    correctOptionIndex: 1,
    explanation: "Unicast sends to single host, multicast to multiple hosts.",
    difficulty: "Hard"
  },
  {
    topic: "Computer Networks",
    questionNumber: 89,
    question: "What is MTU?",
    options: ["Maximum Transmission Unit", "Message Transfer Unit", "Multi-Terminal Unit", "Maximum Transport Update"],
    correctOptionIndex: 0,
    explanation: "MTU is the largest packet size that can be transmitted without fragmentation.",
    difficulty: "Hard"
  },
  {
    topic: "Computer Networks",
    questionNumber: 90,
    question: "What is the difference between static and dynamic routing?",
    options: ["No difference", "Static: manual, Dynamic: automatic adaptation", "Speed only", "Cost only"],
    correctOptionIndex: 1,
    explanation: "Static routing configured manually, dynamic routing adapts to network changes.",
    difficulty: "Hard"
  },

  // ============================================
  // TOPIC 4: Operating Systems
  // ============================================
  // Easy (10)
  {
    topic: "Operating Systems",
    questionNumber: 91,
    question: "What is a process?",
    options: ["A program on disk", "A program in execution", "A thread", "A cache"],
    correctOptionIndex: 1,
    explanation: "A process is a program in execution with dedicated memory and resources.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 92,
    question: "What is the main difference between process and thread?",
    options: ["No difference", "Threads share memory within a process", "Processes are faster", "Threads don't exist"],
    correctOptionIndex: 1,
    explanation: "Threads share the same memory space of a process, processes are independent.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 93,
    question: "CPU scheduling decides _____.",
    options: ["Which program to run", "How much memory to allocate", "Which core to use", "When to turn off"],
    correctOptionIndex: 0,
    explanation: "CPU scheduler decides which process gets CPU time next.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 94,
    question: "What is context switching?",
    options: ["Changing programs", "Saving current process state and loading another", "Swapping memory", "CPU frequency"],
    correctOptionIndex: 1,
    explanation: "Context switch saves current process state and loads another process.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 95,
    question: "Virtual memory allows _____.",
    options: ["Faster CPU", "Programs larger than physical RAM", "Better graphics", "More cores"],
    correctOptionIndex: 1,
    explanation: "Virtual memory uses disk space to extend available memory.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 96,
    question: "A deadlock occurs when _____.",
    options: ["CPU stops", "Processes wait indefinitely for resources", "Memory is full", "Disk fails"],
    correctOptionIndex: 1,
    explanation: "Deadlock: processes wait for resources held by each other.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 97,
    question: "Segmentation divides memory into _____.",
    options: ["Equal fixed-size blocks", "Logical segments of different sizes", "Single block", "Stacks and heaps"],
    correctOptionIndex: 1,
    explanation: "Segmentation divides memory into logical segments of varying sizes.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 98,
    question: "Page replacement decides _____.",
    options: ["CPU usage", "Which page to remove when memory full", "Disk speed", "Cache size"],
    correctOptionIndex: 1,
    explanation: "Page replacement chooses which page to evict when memory is full.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 99,
    question: "What is a daemon process?",
    options: ["A user process", "A background process without user interaction", "A system crash", "A program loader"],
    correctOptionIndex: 1,
    explanation: "Daemon is a background process providing system services.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 100,
    question: "Mutual exclusion ensures _____.",
    options: ["Parallel processing", "Only one process accesses critical section at a time", "Faster execution", "No context switching"],
    correctOptionIndex: 1,
    explanation: "Mutual exclusion prevents multiple processes from accessing critical section simultaneously.",
    difficulty: "Easy"
  },
  // Medium (10)
  {
    topic: "Operating Systems",
    questionNumber: 101,
    question: "Which scheduling algorithm causes starvation?",
    options: ["Round Robin", "FIFO", "Priority-based", "SJF"],
    correctOptionIndex: 2,
    explanation: "Priority-based scheduling can cause low-priority processes to starve.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 102,
    question: "What is thrashing?",
    options: ["Disk failure", "Excessive page swapping reducing performance", "Memory leak", "Swap space full"],
    correctOptionIndex: 1,
    explanation: "Thrashing: excessive page swaps between disk and RAM.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 103,
    question: "Banker's algorithm prevents _____.",
    options: ["Memory corruption", "Deadlock", "Cache misses", "Page faults"],
    correctOptionIndex: 1,
    explanation: "Banker's algorithm avoids deadlock in resource allocation.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 104,
    question: "Main advantage of preemptive scheduling is _____.",
    options: ["Higher throughput", "Lower overhead", "Prevents process monopolizing CPU", "Better cache"],
    correctOptionIndex: 2,
    explanation: "Preemptive scheduling prevents processes from monopolizing CPU.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 105,
    question: "LRU page replacement is _____.",
    options: ["Optimal", "Approximation of optimal", "Worst case", "Unpredictable"],
    correctOptionIndex: 1,
    explanation: "LRU is a practical approximation of the optimal page replacement.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 106,
    question: "What is a semaphore?",
    options: ["Signal flag", "Synchronization primitive with counter", "Memory segment", "File type"],
    correctOptionIndex: 1,
    explanation: "Semaphore is a synchronization tool using counters for process coordination.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 107,
    question: "Binary semaphore is equivalent to _____.",
    options: ["Mutex", "Counting semaphore", "Lock", "Critical section"],
    correctOptionIndex: 0,
    explanation: "Binary semaphore (value 0 or 1) is equivalent to a mutex.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 108,
    question: "What happens during fork()?",
    options: ["Creates thread", "Creates child process with parent's memory copy", "Loads program", "Deletes process"],
    correctOptionIndex: 1,
    explanation: "fork() creates a child process that is a copy of the parent.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 109,
    question: "First-Fit memory allocation _____.",
    options: ["Is optimal", "Allocates to first suitable block", "Always wastes memory", "Requires sorting"],
    correctOptionIndex: 1,
    explanation: "First-Fit allocates memory to the first block large enough.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 110,
    question: "What is a zombie process?",
    options: ["A crashed process", "A process whose parent hasn't reaped it", "A background process", "A suspended process"],
    correctOptionIndex: 1,
    explanation: "Zombie process: terminated but not yet reaped by parent.",
    difficulty: "Medium"
  },
  // Hard (10)
  {
    topic: "Operating Systems",
    questionNumber: 111,
    question: "Which scheduling minimizes average waiting time?",
    options: ["FCFS", "Shortest Job First", "Round Robin", "Priority"],
    correctOptionIndex: 1,
    explanation: "SJF minimizes average waiting time among non-preemptive algorithms.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 112,
    question: "Purpose of paging is _____.",
    options: ["Swap processes", "Divide virtual address space into fixed-size pages", "Allocate memory", "Manage cache"],
    correctOptionIndex: 1,
    explanation: "Paging divides memory into fixed-size pages for flexible management.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 113,
    question: "Monitor provides _____.",
    options: ["I/O operations", "Mutual exclusion and condition variables", "Memory allocation", "File access"],
    correctOptionIndex: 1,
    explanation: "Monitor combines mutual exclusion with condition variables.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 114,
    question: "Coffman conditions for deadlock are _____.",
    options: ["One condition", "Four conditions (hold, no-preempt, circular, mutual exclusion)", "Two", "Five"],
    correctOptionIndex: 1,
    explanation: "Four Coffman conditions: mutual exclusion, hold and wait, no preemption, circular wait.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 115,
    question: "TLB speeds up _____.",
    options: ["Page replacement", "Virtual-to-physical address translation", "Cache access", "Disk I/O"],
    correctOptionIndex: 1,
    explanation: "TLB caches page table entries for faster address translation.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 116,
    question: "Difference between hard and soft real-time _____.",
    options: ["No difference", "Hard: strict deadlines, Soft: flexible deadlines", "Speed only", "Cost"],
    correctOptionIndex: 1,
    explanation: "Hard real-time: missing deadline causes failure, Soft: reduced quality.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 117,
    question: "Belady's anomaly occurs in _____.",
    options: ["LRU", "FIFO", "LFU", "Clock"],
    correctOptionIndex: 1,
    explanation: "FIFO page replacement shows Belady's anomaly: more frames can increase faults.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 118,
    question: "Copy-on-write optimization _____.",
    options: ["Copy all pages", "Delay copying until write occurs", "Encrypt pages", "Compress pages"],
    correctOptionIndex: 1,
    explanation: "CoW shares pages until modified, then creates a copy.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 119,
    question: "Priority inversion occurs when _____.",
    options: ["Priorities are equal", "Low-priority task holds resource needed by high-priority", "Task misses deadline", "Cache miss"],
    correctOptionIndex: 1,
    explanation: "Priority inversion: high-priority task waits for low-priority task.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 120,
    question: "Purpose of working set is _____.",
    options: ["Virtual memory size", "Set of pages actively used by process", "Cache size", "Memory block"],
    correctOptionIndex: 1,
    explanation: "Working set: pages a process actively uses in a time period.",
    difficulty: "Hard"
  },

  // ============================================
  // TOPIC 5: Behavioral
  // ============================================
  // Easy (10)
  {
    topic: "Behavioral",
    questionNumber: 121,
    question: "What is the most important communication skill?",
    options: ["Speaking loudly", "Active listening", "Writing only", "Non-verbal only"],
    correctOptionIndex: 1,
    explanation: "Active listening is fundamental to effective communication.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral",
    questionNumber: 122,
    question: "How should you handle constructive criticism?",
    options: ["Ignore it", "Get defensive", "Listen, understand, and improve", "Argue back"],
    correctOptionIndex: 2,
    explanation: "Consider feedback as an opportunity for growth and improvement.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral",
    questionNumber: 123,
    question: "What is teamwork?",
    options: ["Working alone", "Combining efforts of group toward common goal", "Following orders only", "No collaboration"],
    correctOptionIndex: 1,
    explanation: "Teamwork involves coordinating with others to achieve common objectives.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral",
    questionNumber: 124,
    question: "How do you handle conflict with a colleague?",
    options: ["Avoid them", "Discuss privately and professionally", "Escalate immediately", "Ignore it"],
    correctOptionIndex: 1,
    explanation: "Address conflicts calmly and professionally to find mutually beneficial solutions.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral",
    questionNumber: 125,
    question: "What is professional ethics?",
    options: ["Making decisions based on profit", "Moral principles guiding conduct", "Company rules only", "Personal preference"],
    correctOptionIndex: 1,
    explanation: "Ethics guide honest, fair, and responsible professional behavior.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral",
    questionNumber: 126,
    question: "How should you handle failure?",
    options: ["Blame others", "Learn from it and move forward", "Quit", "Hide it"],
    correctOptionIndex: 1,
    explanation: "View failures as learning opportunities and analyze what went wrong.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral",
    questionNumber: 127,
    question: "What is emotional intelligence?",
    options: ["High IQ", "Ability to understand and manage emotions", "Competitiveness", "Technical skills"],
    correctOptionIndex: 1,
    explanation: "EI includes self-awareness, empathy, and social skills.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral",
    questionNumber: 128,
    question: "How do you stay motivated?",
    options: ["Money only", "Set goals, celebrate wins, find meaning", "Competition", "External pressure only"],
    correctOptionIndex: 1,
    explanation: "Intrinsic and extrinsic motivation both contribute to sustained effort.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral",
    questionNumber: 129,
    question: "What is adaptability?",
    options: ["Being stubborn", "Ability to adjust to changing circumstances", "Resistance to change", "Inflexibility"],
    correctOptionIndex: 1,
    explanation: "Adaptability is crucial in today's fast-changing work environment.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral",
    questionNumber: 130,
    question: "How should you approach deadlines?",
    options: ["Miss them", "Plan ahead and manage time effectively", "Rush at the end", "Ignore them"],
    correctOptionIndex: 1,
    explanation: "Proper planning and time management help meet deadlines consistently.",
    difficulty: "Easy"
  },
  // Medium (10)
  {
    topic: "Behavioral",
    questionNumber: 131,
    question: "How do you handle pressure in the workplace?",
    options: ["Panic", "Stay calm, prioritize, seek help if needed", "Pressure is bad always", "Work alone"],
    correctOptionIndex: 1,
    explanation: "Effective pressure management involves maintaining composure and strategic thinking.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral",
    questionNumber: 132,
    question: "Tell me about your biggest workplace achievement.",
    options: ["Make it up", "Describe real achievement with context and impact", "Brag only", "Be vague"],
    correctOptionIndex: 1,
    explanation: "Use STAR method: Situation, Task, Action, Result to explain achievements.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral",
    questionNumber: 133,
    question: "How would you handle disagreement with your manager?",
    options: ["Never disagree", "Express professionally with facts and data", "Complain to others", "Resign"],
    correctOptionIndex: 1,
    explanation: "Professional disagreement, backed by evidence, is healthy and valued.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral",
    questionNumber: 134,
    question: "How do you prioritize multiple tasks?",
    options: ["Random order", "By urgency and importance", "Always the easiest first", "No planning"],
    correctOptionIndex: 1,
    explanation: "Prioritization based on importance and deadlines ensures efficient work.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral",
    questionNumber: 135,
    question: "What does accountability mean?",
    options: ["Blaming others", "Taking responsibility for actions and decisions", "Avoiding blame", "External control only"],
    correctOptionIndex: 1,
    explanation: "Accountability means owning outcomes, both successes and failures.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral",
    questionNumber: 136,
    question: "How do you handle feedback from peers?",
    options: ["Ignore it", "Evaluate objectively and adjust if valid", "Get angry", "Take it personally"],
    correctOptionIndex: 1,
    explanation: "Peer feedback provides valuable perspective for professional development.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral",
    questionNumber: 137,
    question: "What is integrity?",
    options: ["Following rules only when watched", "Consistently acting honestly and ethically", "Lying to get ahead", "Flexibility with honesty"],
    correctOptionIndex: 1,
    explanation: "Integrity means aligning actions with values regardless of circumstances.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral",
    questionNumber: 138,
    question: "How do you build trust with colleagues?",
    options: ["Be dishonest", "Be reliable, transparent, and genuine", "Make promises you can't keep", "Hide information"],
    correctOptionIndex: 1,
    explanation: "Trust is built through consistency, honesty, and follow-through.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral",
    questionNumber: 139,
    question: "How do you approach continuous learning?",
    options: ["Stop learning after school", "Actively seek growth through courses and experience", "Only when required", "Learning is a waste"],
    correctOptionIndex: 1,
    explanation: "Lifelong learning is essential for career development and relevance.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral",
    questionNumber: 140,
    question: "What is influence?",
    options: ["Authority only", "Ability to persuade and inspire others", "Hierarchy position", "Money and power"],
    correctOptionIndex: 1,
    explanation: "Influence comes from credibility, competence, and relationship-building.",
    difficulty: "Medium"
  },
  // Hard (10)
  {
    topic: "Behavioral",
    questionNumber: 141,
    question: "Describe a time when you had to make an ethical decision against company pressure.",
    options: ["Made unethical choice", "Stood by principles and found alternative solution", "Didn't face such situations", "Gave up"],
    correctOptionIndex: 1,
    explanation: "Maintaining ethical principles demonstrates integrity and courage.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral",
    questionNumber: 142,
    question: "How would you lead a team with diverse backgrounds?",
    options: ["Treat everyone the same", "Recognize differences, include everyone, adapt leadership", "No diversity discussion", "Exclude minorities"],
    correctOptionIndex: 1,
    explanation: "Diverse teams benefit from inclusive leadership that values different perspectives.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral",
    questionNumber: 143,
    question: "Tell me about a time you failed and how you recovered.",
    options: ["Never failed", "Describe failure, lessons learned, and improvements made", "Blame others", "Give up"],
    correctOptionIndex: 1,
    explanation: "How you respond to failure shows resilience and growth mindset.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral",
    questionNumber: 144,
    question: "How do you navigate organizational politics professionally?",
    options: ["Avoid it completely", "Stay aware, maintain integrity, build alliances", "Engage in gossip", "Ignore dynamics"],
    correctOptionIndex: 1,
    explanation: "Successful navigation requires understanding dynamics while maintaining principles.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral",
    questionNumber: 145,
    question: "How would you handle working with someone you dislike?",
    options: ["Refuse to work", "Separate personal feelings, focus on professional goals", "Complain constantly", "Sabotage"],
    correctOptionIndex: 1,
    explanation: "Professional maturity means working effectively despite personal differences.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral",
    questionNumber: 146,
    question: "What is your approach to mentoring others?",
    options: ["No mentoring", "Share knowledge, provide guidance, encourage growth", "Compete with them", "Hoard knowledge"],
    correctOptionIndex: 1,
    explanation: "Effective mentoring accelerates team growth and builds supportive culture.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral",
    questionNumber: 147,
    question: "How do you balance career ambitition with team success?",
    options: ["Only personal goals", "Align goals with team, uplift others", "Sabotage competitors", "Take credit only"],
    correctOptionIndex: 1,
    explanation: "Greatest leaders achieve personal success while elevating their teams.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral",
    questionNumber: 148,
    question: "How do you handle rapid organizational change?",
    options: ["Resist it", "Embrace it, adapt quickly, help others adjust", "Complain loudly", "Look for new job"],
    correctOptionIndex: 1,
    explanation: "Adaptability and positive attitude help navigate organizational change.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral",
    questionNumber: 149,
    question: "What is your approach to work-life balance?",
    options: ["Work is everything", "Set boundaries, maintain health, find fulfillment", "Never work hard", "Ignore personal life"],
    correctOptionIndex: 1,
    explanation: "Long-term success requires sustainable balance between work and personal life.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral",
    questionNumber: 150,
    question: "How do you inspire and motivate your team?",
    options: ["Fear and pressure", "Set vision, provide autonomy, recognize achievement", "Money only", "Strict rules"],
    correctOptionIndex: 1,
    explanation: "True motivation comes from purpose, autonomy, mastery, and recognition.",
    difficulty: "Hard"
  }
];

try {
  await Theory.deleteMany({});
  console.log("Old theory questions removed");

  await Theory.insertMany(theoryQuestions);

  console.log(` ${theoryQuestions.length} Theory MCQ Questions Added Successfully`);
  console.log("\nBreakdown:");
  console.log("- OOPS: 30 questions (10 Easy, 10 Medium, 10 Hard)");
  console.log("- DBMS: 30 questions (10 Easy, 10 Medium, 10 Hard)");
  console.log("- Computer Networks: 30 questions (10 Easy, 10 Medium, 10 Hard)");
  console.log("- Operating Systems: 30 questions (10 Easy, 10 Medium, 10 Hard)");
  console.log("- Behavioral: 30 questions (10 Easy, 10 Medium, 10 Hard)");
  process.exit();
} catch (err) {
  console.error("Error seeding theory questions:", err);
  process.exit(1);
}
