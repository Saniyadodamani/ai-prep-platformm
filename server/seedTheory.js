import Theory from "./models/Theory.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const theoryQuestions = [
  // Operating Systems (20 questions)
  {
    topic: "Operating Systems",
    questionNumber: 1,
    question: "What is a process in an operating system?",
    options: [
      "A program in execution with its own memory space",
      "A program stored on disk",
      "A CPU core",
      "A network connection"
    ],
    correctOptionIndex: 0,
    explanation: "A process is an instance of a program in execution. It consists of the program code, its current activity, and allocated resources like memory.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 2,
    question: "Which scheduling algorithm minimizes average waiting time?",
    options: [
      "FCFS",
      "Shortest Job First (SJF)",
      "Round Robin",
      "Priority Scheduling"
    ],
    correctOptionIndex: 1,
    explanation: "SJF minimizes average waiting time among non-preemptive algorithms by executing shortest jobs first.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 3,
    question: "What is a deadlock?",
    options: [
      "When a process terminates unexpectedly",
      "When two or more processes wait indefinitely for resources held by each other",
      "When CPU is overloaded",
      "When memory is full"
    ],
    correctOptionIndex: 1,
    explanation: "A deadlock occurs when a set of processes are blocked because each process is waiting for a resource held by another process in the set.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 4,
    question: "What are the necessary conditions for deadlock?",
    options: [
      "Mutual Exclusion and Hold-and-Wait",
      "Mutual Exclusion, Hold-and-Wait, No Preemption, and Circular Wait",
      "Only Circular Wait",
      "Only No Preemption"
    ],
    correctOptionIndex: 1,
    explanation: "All four conditions must be present simultaneously for a deadlock to occur: mutual exclusion, hold-and-wait, no preemption, and circular wait.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 5,
    question: "What is virtual memory?",
    options: [
      "Memory that doesn't exist",
      "Using hard disk space as an extension of RAM",
      "Memory in the CPU cache",
      "Memory used by virtual machines only"
    ],
    correctOptionIndex: 1,
    explanation: "Virtual memory enables programs to use more memory than physically available by using disk space as an extension of RAM through paging or segmentation.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 6,
    question: "What is the difference between paging and segmentation?",
    options: [
      "Paging divides memory into equal fixed-size blocks; segmentation divides into variable-size logical segments",
      "They are the same thing",
      "Paging is older technology",
      "Segmentation uses more memory"
    ],
    correctOptionIndex: 0,
    explanation: "Paging uses fixed-size pages while segmentation uses variable-size segments based on logical program divisions.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 7,
    question: "What is a thread?",
    options: [
      "A process with multiple execution units sharing the same memory",
      "A program on disk",
      "A cache memory unit",
      "A network protocol"
    ],
    correctOptionIndex: 0,
    explanation: "A thread is a lightweight process that shares memory space with other threads but has its own stack and registers.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 8,
    question: "What is the purpose of a semaphore?",
    options: [
      "To control CPU frequency",
      "To synchronize access to shared resources",
      "To manage disk I/O",
      "To allocate memory"
    ],
    correctOptionIndex: 1,
    explanation: "A semaphore is a synchronization primitive that controls access to shared resources by maintaining a counter.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 9,
    question: "What is thrashing?",
    options: [
      "System crashes frequently",
      "Excessive disk I/O due to constant page faults",
      "CPU overheating",
      "Network congestion"
    ],
    correctOptionIndex: 1,
    explanation: "Thrashing occurs when a system spends more time swapping pages than executing processes, severely degrading performance.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 10,
    question: "What is context switching?",
    options: [
      "Changing the wallpaper",
      "Saving and restoring the state of a process to switch to another",
      "Switching between monitors",
      "Changing network connections"
    ],
    correctOptionIndex: 1,
    explanation: "Context switching is the mechanism by which a CPU saves the state of one process and loads another for execution.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 11,
    question: "What is a race condition?",
    options: [
      "Two processes competing for CPU time",
      "Unpredictable behavior when multiple processes access shared data simultaneously without synchronization",
      "Two CPUs running at different speeds",
      "Network latency between servers"
    ],
    correctOptionIndex: 1,
    explanation: "A race condition occurs when the outcome depends on the relative timing of process execution.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 12,
    question: "What is a mutex?",
    options: [
      "A type of processor",
      "A mutual exclusion lock that ensures only one thread accesses a resource at a time",
      "A memory management technique",
      "A network protocol"
    ],
    correctOptionIndex: 1,
    explanation: "A mutex (mutual exclusion) is a synchronization mechanism that allows only one thread to access a resource at a time.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 13,
    question: "What is the difference between multiprogramming and multithreading?",
    options: [
      "Multiprogramming is for multiple CPUs; multithreading is for single CPU",
      "Multiprogramming allows multiple processes; multithreading allows multiple threads within a process",
      "They are identical",
      "Multithreading is older technology"
    ],
    correctOptionIndex: 1,
    explanation: "Multiprogramming supports multiple processes sharing CPU; multithreading allows multiple threads within a single process sharing memory.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 14,
    question: "What is interrupt handling?",
    options: [
      "Ignoring system messages",
      "The mechanism for handling asynchronous events that pause current process execution",
      "Stopping a running process",
      "Network communication"
    ],
    correctOptionIndex: 1,
    explanation: "Interrupt handling allows the CPU to respond to asynchronous events by pausing the current process and executing an interrupt handler.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 15,
    question: "What are the different process states?",
    options: [
      "Created, Executing, Completed",
      "New, Ready, Running, Waiting, Terminated",
      "Active and Inactive",
      "Start, Middle, End"
    ],
    correctOptionIndex: 1,
    explanation: "Process states are New, Ready, Running, Waiting (Blocked), and Terminated.",
    difficulty: "Easy"
  },
  {
    topic: "Operating Systems",
    questionNumber: 16,
    question: "What is the main difference between preemptive and non-preemptive scheduling?",
    options: [
      "Preemptive is faster",
      "In preemptive scheduling, OS can interrupt a running process; in non-preemptive, a process runs until completion",
      "Non-preemptive uses more memory",
      "They are the same"
    ],
    correctOptionIndex: 1,
    explanation: "Preemptive scheduling allows the OS to forcibly remove a running process; non-preemptive lets a process complete.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 17,
    question: "What is a page fault?",
    options: [
      "Corruption in data",
      "When a process accesses a page not in main memory, requiring it to be loaded from disk",
      "A CPU error",
      "A network error"
    ],
    correctOptionIndex: 1,
    explanation: "A page fault occurs when a process tries to access a page that is not currently in physical memory.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 18,
    question: "What is memory fragmentation?",
    options: [
      "Memory that is physically broken",
      "Wasted memory due to inefficient allocation leaving holes that cannot be used",
      "Encrypted memory",
      "Slow memory"
    ],
    correctOptionIndex: 1,
    explanation: "Memory fragmentation occurs when free memory is split into small, non-contiguous blocks that cannot be efficiently allocated.",
    difficulty: "Medium"
  },
  {
    topic: "Operating Systems",
    questionNumber: 19,
    question: "What is Priority Inversion?",
    options: [
      "Reversing the priority of a process",
      "A high-priority process waiting for a low-priority process to release a resource",
      "Disabling process priorities",
      "A CPU malfunction"
    ],
    correctOptionIndex: 1,
    explanation: "Priority inversion occurs when a high-priority task waits for a resource held by a low-priority task.",
    difficulty: "Hard"
  },
  {
    topic: "Operating Systems",
    questionNumber: 20,
    question: "What is a critical section?",
    options: [
      "Important part of the OS",
      "A code segment where a process accesses shared resources and must execute atomically without interference",
      "The main program code",
      "System memory area"
    ],
    correctOptionIndex: 1,
    explanation: "A critical section is a code region where shared resources are accessed and must be protected from concurrent access.",
    difficulty: "Medium"
  },

  // DBMS (20 questions)
  {
    topic: "DBMS",
    questionNumber: 1,
    question: "What is ACID in databases?",
    options: [
      "A chemical compound",
      "Atomicity, Consistency, Isolation, Durability - properties ensuring reliable transactions",
      "A type of database",
      "A data structure"
    ],
    correctOptionIndex: 1,
    explanation: "ACID ensures that database transactions are reliable and maintain data integrity.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 2,
    question: "What is normalization?",
    options: [
      "Making data look normal",
      "Organizing data to minimize redundancy and improve data integrity through normal forms",
      "Compressing data",
      "Encrypting data"
    ],
    correctOptionIndex: 1,
    explanation: "Normalization is a process of organizing data in a database to reduce redundancy.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 3,
    question: "What is the difference between INNER JOIN and LEFT JOIN?",
    options: [
      "No difference",
      "INNER JOIN returns only matching rows; LEFT JOIN returns all rows from left table and matching from right",
      "LEFT JOIN is faster",
      "INNER JOIN allows NULL values"
    ],
    correctOptionIndex: 1,
    explanation: "INNER JOIN returns only rows that match in both tables; LEFT JOIN includes all left table rows even if no match.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 4,
    question: "What is a primary key?",
    options: [
      "The first column in a table",
      "A column that uniquely identifies each record with NOT NULL constraint",
      "A keyword for searching",
      "An encryption key"
    ],
    correctOptionIndex: 1,
    explanation: "A primary key uniquely identifies each row and cannot contain NULL values.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 5,
    question: "What is a foreign key?",
    options: [
      "A key from another country",
      "A column that creates a relationship by referencing the primary key of another table",
      "An encryption key",
      "A type of password"
    ],
    correctOptionIndex: 1,
    explanation: "A foreign key establishes a relationship between tables by referencing another table's primary key.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 6,
    question: "What is an index in a database?",
    options: [
      "A list of contents",
      "A data structure that improves query performance by allowing faster data retrieval",
      "A type of table",
      "A backup file"
    ],
    correctOptionIndex: 1,
    explanation: "An index is a data structure that speeds up data retrieval operations on a table.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 7,
    question: "What is the purpose of a transaction?",
    options: [
      "To exchange money",
      "A sequence of operations that either all succeed or all fail, maintaining data consistency",
      "To transfer data between servers",
      "To back up the database"
    ],
    correctOptionIndex: 1,
    explanation: "A transaction ensures data consistency by guaranteeing all-or-nothing execution of operations.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 8,
    question: "What is a view in a database?",
    options: [
      "A visual representation of data",
      "A virtual table based on the result of a SELECT query",
      "A server monitoring tool",
      "A data backup"
    ],
    correctOptionIndex: 1,
    explanation: "A view is a virtual table that doesn't store data but provides a customized perspective of existing tables.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 9,
    question: "What is denormalization?",
    options: [
      "Making data abnormal",
      "Intentionally introducing redundancy to improve read performance at the cost of write complexity",
      "Removing all constraints",
      "Deleting unnecessary data"
    ],
    correctOptionIndex: 1,
    explanation: "Denormalization adds redundancy to reduce complex queries and improve read performance.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 10,
    question: "What is CAP theorem?",
    options: [
      "A type of database",
      "In distributed systems, you can have at most 2 of 3: Consistency, Availability, Partition tolerance",
      "A network protocol",
      "A data backup strategy"
    ],
    correctOptionIndex: 1,
    explanation: "CAP theorem states distributed systems cannot simultaneously guarantee all three properties.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 11,
    question: "What is a cursor in SQL?",
    options: [
      "The mouse pointer",
      "A database object that allows row-by-row processing of query results",
      "A syntax highlighting tool",
      "A data type"
    ],
    correctOptionIndex: 1,
    explanation: "A cursor is a control structure that allows processing query results row by row.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 12,
    question: "What is the difference between DROP and DELETE?",
    options: [
      "No difference",
      "DROP removes table structure; DELETE removes rows. DROP cannot be rolled back in some systems.",
      "DELETE is faster",
      "DROP deletes one row"
    ],
    correctOptionIndex: 1,
    explanation: "DROP removes the table structure; DELETE removes rows and can be rolled back with transactions.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 13,
    question: "What is a trigger?",
    options: [
      "A warning message",
      "A special procedure that automatically executes in response to specific events on a table",
      "A user account",
      "A query optimizer"
    ],
    correctOptionIndex: 1,
    explanation: "A trigger is a stored procedure that executes automatically when specified database events occur.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 14,
    question: "What is the difference between Clustered and Non-Clustered Index?",
    options: [
      "Clustered is for clusters only",
      "Clustered index sorts table data; non-clustered doesn't. Table has one clustered, multiple non-clustered.",
      "Both are the same",
      "Non-clustered is faster"
    ],
    correctOptionIndex: 1,
    explanation: "Clustered index sorts and stores data rows; non-clustered creates separate index structure.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 15,
    question: "What is a stored procedure?",
    options: [
      "A query written by a store",
      "A precompiled collection of SQL statements stored in the database and executed on demand",
      "A backup procedure",
      "A data cleaning process"
    ],
    correctOptionIndex: 1,
    explanation: "A stored procedure is a set of prewritten SQL statements that can be called and reused.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 16,
    question: "What is the 1NF (First Normal Form)?",
    options: [
      "A type of database",
      "Removes repeating groups by ensuring all attribute values are atomic (indivisible)",
      "A backup method",
      "An encryption standard"
    ],
    correctOptionIndex: 1,
    explanation: "1NF requires all attribute values to be atomic with no repeating groups.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 17,
    question: "What is an aggregate function?",
    options: [
      "A function that combines databases",
      "A function that performs calculations on multiple rows (COUNT, SUM, AVG, MAX, MIN)",
      "A function that transfers data",
      "A function that secures data"
    ],
    correctOptionIndex: 1,
    explanation: "Aggregate functions compute a single result from multiple input rows.",
    difficulty: "Easy"
  },
  {
    topic: "DBMS",
    questionNumber: 18,
    question: "What is a GROUP BY clause used for?",
    options: [
      "Grouping database servers",
      "Organizing rows into groups and applying aggregate functions to each group",
      "Deleting groups of records",
      "Backing up data in groups"
    ],
    correctOptionIndex: 1,
    explanation: "GROUP BY organizes rows shares common values and allows aggregate calculations per group.",
    difficulty: "Medium"
  },
  {
    topic: "DBMS",
    questionNumber: 19,
    question: "What is the difference between HAVING and WHERE?",
    options: [
      "No difference",
      "WHERE filters rows before grouping; HAVING filters groups after aggregation",
      "HAVING is faster",
      "WHERE filters aggregates"
    ],
    correctOptionIndex: 1,
    explanation: "WHERE filters rows before grouping; HAVING filters aggregate results after grouping.",
    difficulty: "Hard"
  },
  {
    topic: "DBMS",
    questionNumber: 20,
    question: "What is database replication?",
    options: [
      "Duplicating database files",
      "Creating copies of a database on multiple servers for redundancy and read scaling",
      "Backing up data",
      "Compressing data"
    ],
    correctOptionIndex: 1,
    explanation: "Replication maintains copies of data across multiple servers for high availability and scalability.",
    difficulty: "Medium"
  },

  // Computer Networks (20 questions starting)
  {
    topic: "Computer Networks",
    questionNumber: 1,
    question: "What does OSI model stand for?",
    options: [
      "Open System Interface",
      "Open Systems Interconnection - a 7-layer model for network communication",
      "Operating System Interaction",
      "Online Service Interface"
    ],
    correctOptionIndex: 1,
    explanation: "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 2,
    question: "What is the purpose of TCP?",
    options: [
      "To display web pages",
      "Transmission Control Protocol - provides reliable, ordered delivery of data over networks",
      "To encrypt data",
      "To manage files"
    ],
    correctOptionIndex: 1,
    explanation: "TCP ensures reliable, in-order delivery of data with error checking and flow control.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 3,
    question: "What is the difference between TCP and UDP?",
    options: [
      "No difference",
      "TCP is reliable with handshake; UDP is connectionless and faster but unreliable",
      "UDP is older",
      "TCP is only for websites"
    ],
    correctOptionIndex: 1,
    explanation: "TCP requires connection setup and guarantees delivery; UDP is connectionless and may lose packets.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 4,
    question: "What is an IP address?",
    options: [
      "A personal code",
      "Internet Protocol address - unique identifier for devices on a network",
      "A password",
      "A device name"
    ],
    correctOptionIndex: 1,
    explanation: "An IP address uniquely identifies a device on a network (IPv4: 32-bit, IPv6: 128-bit).",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 5,
    question: "What is a subnet mask?",
    options: [
      "A security mask",
      "Divides an IP address into network and host portions, used to identify subnets",
      "An encryption method",
      "A firewall rule"
    ],
    correctOptionIndex: 1,
    explanation: "A subnet mask determines which portion of an IP address represents the network.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 6,
    question: "What is DNS?",
    options: [
      "A security protocol",
      "Domain Name System - translates domain names to IP addresses",
      "Data Network Service",
      "A routing algorithm"
    ],
    correctOptionIndex: 1,
    explanation: "DNS resolves human-readable domain names to IP addresses for network routing.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 7,
    question: "What is a gateway?",
    options: [
      "A door to a building",
      "A network node that serves as an access point to another network, often translating protocols",
      "A firewall",
      "A router"
    ],
    correctOptionIndex: 1,
    explanation: "A gateway connects networks and may translate between different network protocols.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 8,
    question: "What is the purpose of ARP?",
    options: [
      "A protocol for web browsing",
      "Address Resolution Protocol - maps IP addresses to MAC addresses",
      "A security measure",
      "A data encryption method"
    ],
    correctOptionIndex: 1,
    explanation: "ARP resolves IP addresses to physical MAC addresses on local networks.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 9,
    question: "What is bandwidth?",
    options: [
      "A range of frequencies",
      "The maximum data transmission rate of a network connection measured in bits per second",
      "The number of devices connected",
      "The distance between routers"
    ],
    correctOptionIndex: 1,
    explanation: "Bandwidth is the capacity of a network to transmit data, measured in bps.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 10,
    question: "What is latency?",
    options: [
      "Bandwidth",
      "The time delay between sending and receiving data",
      "The speed of light",
      "Network congestion"
    ],
    correctOptionIndex: 1,
    explanation: "Latency is the delay in communication, measured in milliseconds.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 11,
    question: "What is the difference between IPv4 and IPv6?",
    options: [
      "IPv6 is faster",
      "IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses for larger address space",
      "IPv4 is for mobile, IPv6 for desktop",
      "They are identical"
    ],
    correctOptionIndex: 1,
    explanation: "IPv4 (32-bit) has ~4.3 billion addresses; IPv6 (128-bit) has vastly more addresses.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 12,
    question: "What is a router?",
    options: [
      "A tool for cutting grooves",
      "A network device that forwards data packets between computer networks",
      "A type of cable",
      "A security software"
    ],
    correctOptionIndex: 1,
    explanation: "A router forwards packets between networks based on routing tables.",
    difficulty: "Easy"
  },
  {
    topic: "Computer Networks",
    questionNumber: 13,
    question: "What is NAT (Network Address Translation)?",
    options: [
      "A security threat",
      "A technique that translates private IP addresses to public ones for internet communication",
      "A data compression method",
      "A type of router"
    ],
    correctOptionIndex: 1,
    explanation: "NAT enables private networks to communicate with external networks using translated addresses.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 14,
    question: "What is SSL/TLS?",
    options: [
      "A network protocol for routing",
      "Security protocols that encrypt data in transit for secure web communication",
      "A type of connection",
      "A file format"
    ],
    correctOptionIndex: 1,
    explanation: "SSL/TLS provides encryption and authentication for secure internet communication.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 15,
    question: "What is a VLAN?",
    options: [
      "Very Long Area Network",
      "Virtual LAN - logically groups devices on the same physical network into separate networks",
      "A wireless standard",
      "A type of server"
    ],
    correctOptionIndex: 1,
    explanation: "VLANs allow logical network segmentation on physical infrastructure.",
    difficulty: "Hard"
  },
  {
    topic: "Computer Networks",
    questionNumber: 16,
    question: "What is the purpose of DHCP?",
    options: [
      "Data encryption",
      "Dynamic Host Configuration Protocol - automatically assigns IP addresses to devices",
      "Network routing",
      "Data compression"
    ],
    correctOptionIndex: 1,
    explanation: "DHCP automates IP address assignment to network devices.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 17,
    question: "What is a proxy server?",
    options: [
      "A type of database",
      "A server that acts as an intermediary between clients and other servers",
      "A backup server",
      "A web server"
    ],
    correctOptionIndex: 1,
    explanation: "A proxy server intercepts and forwards requests, providing caching, filtering, or anonymity.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 18,
    question: "What is packet switching?",
    options: [
      "Switching between packets manually",
      "Routing data by breaking it into packets and sending via different paths",
      "Encrypting packets",
      "A firewall feature"
    ],
    correctOptionIndex: 1,
    explanation: "Packet switching breaks data into packets that travel independently across networks.",
    difficulty: "Medium"
  },
  {
    topic: "Computer Networks",
    questionNumber: 19,
    question: "What is congestion control in networks?",
    options: [
      "Blocking all traffic",
      "Mechanisms that adjust data transmission rates to prevent network overload",
      "A type of firewall",
      "A data encryption method"
    ],
    correctOptionIndex: 1,
    explanation: "Congestion control regulates traffic to prevent network bottlenecks and maintain performance.",
    difficulty: "Hard"
  },
  {
    topic: "Computer Networks",
    questionNumber: 20,
    question: "What is quality of service (QoS)?",
    options: [
      "Customer satisfaction rating",
      "Mechanisms that prioritize network traffic to ensure performance requirements are met",
      "A server feature",
      "A security measure"
    ],
    correctOptionIndex: 1,
    explanation: "QoS prioritizes traffic types to guarantee bandwidth, latency, and reliability.",
    difficulty: "Medium"
  },

  // OOPS (20 questions)
  {
    topic: "OOPS",
    questionNumber: 1,
    question: "What is encapsulation?",
    options: [
      "Wrapping data in a package",
      "Bundling data and methods into a class, hiding internal details from the outside",
      "Organizing files",
      "A type of inheritance"
    ],
    correctOptionIndex: 1,
    explanation: "Encapsulation hides internal object state and only exposes necessary interfaces.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 2,
    question: "What is inheritance?",
    options: [
      "Getting money from someone",
      "A mechanism where a class inherits properties and methods from another class",
      "Creating new objects",
      "A type of polymorphism"
    ],
    correctOptionIndex: 1,
    explanation: "Inheritance allows classes to inherit and reuse code from parent classes.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 3,
    question: "What is polymorphism?",
    options: [
      "Many shapes",
      "The ability of objects to take multiple forms or methods to have multiple implementations",
      "A type of interface",
      "Object creation"
    ],
    correctOptionIndex: 1,
    explanation: "Polymorphism allows methods to be overridden (runtime) or overloaded (compile-time).",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 4,
    question: "What is abstraction?",
    options: [
      "Thinking abstractly",
      "Hiding complex implementation details and showing only essential features",
      "Creating abstract methods",
      "A type of class"
    ],
    correctOptionIndex: 1,
    explanation: "Abstraction simplifies interfaces by hiding implementation complexity.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 5,
    question: "What is the difference between class and object?",
    options: [
      "No difference",
      "A class is a blueprint; an object is an instance of a class",
      "An object contains classes",
      "Classes are for data"
    ],
    correctOptionIndex: 1,
    explanation: "A class is a template; objects are instances created from that template.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 6,
    question: "What is method overloading?",
    options: [
      "Using same method too much",
      "Having multiple methods with the same name but different parameters in the same class",
      "Creating too many methods",
      "A type of inheritance"
    ],
    correctOptionIndex: 1,
    explanation: "Overloading occurs at compile-time with different method signatures.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 7,
    question: "What is method overriding?",
    options: [
      "Replacing method code with new code",
      "A subclass providing a specific implementation of a parent class method",
      "Removing a method",
      "Copying a method"
    ],
    correctOptionIndex: 1,
    explanation: "Overriding occurs at runtime when a subclass redefines a parent method.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 8,
    question: "What is a constructor?",
    options: [
      "Someone who builds things",
      "A special method that initializes objects when they are created",
      "A method that builds classes",
      "A data type"
    ],
    correctOptionIndex: 1,
    explanation: "A constructor is called when an object is instantiated to initialize its state.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 9,
    question: "What is the difference between public, private, and protected access modifiers?",
    options: [
      "They are the same",
      "public: accessible everywhere; private: only in class; protected: in class and subclasses",
      "public is faster",
      "No difference in functionality"
    ],
    correctOptionIndex: 1,
    explanation: "Access modifiers control visibility of class members.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 10,
    question: "What is an interface?",
    options: [
      "A visual screen",
      "A contract defining methods that implementing classes must provide",
      "A type of class",
      "A data structure"
    ],
    correctOptionIndex: 1,
    explanation: "An interface specifies what methods a class should implement without implementation.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 11,
    question: "What is an abstract class?",
    options: [
      "A class with no methods",
      "A class that cannot be instantiated and provides common functionality for subclasses",
      "A class with one method",
      "A type of interface"
    ],
    correctOptionIndex: 1,
    explanation: "Abstract classes define templates with abstract methods for subclasses to implement.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 12,
    question: "What is the difference between abstract class and interface?",
    options: [
      "No difference",
      "Abstract class can have state and methods; interface defines contract only (in Java pre-8)",
      "Interface is stronger",
      "Abstract class is for data"
    ],
    correctOptionIndex: 1,
    explanation: "Abstract classes can have state; interfaces define contracts without state.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 13,
    question: "What is composition?",
    options: [
      "Writing code",
      "Building classes from other objects (has-a relationship) instead of inheritance",
      "Creating inheritance",
      "A type of method"
    ],
    correctOptionIndex: 1,
    explanation: "Composition is preferable to inheritance for 'has-a' relationships.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 14,
    question: "What is the difference between 'is-a' and 'has-a' relationship?",
    options: [
      "They are the same",
      "'is-a': inheritance; 'has-a': composition",
      "They apply to the same situation",
      "'has-a' is older"
    ],
    correctOptionIndex: 1,
    explanation: "'is-a' represents inheritance; 'has-a' represents composition.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 15,
    question: "What is a static method?",
    options: [
      "A method that doesn't move",
      "A method that belongs to the class itself, not to instances (objects)",
      "A method that never changes",
      "A type of abstract method"
    ],
    correctOptionIndex: 1,
    explanation: "Static methods are called on the class, not on instances, and can't access instance variables.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 16,
    question: "What is this keyword?",
    options: [
      "A reserved word",
      "A reference to the current object instance within the class",
      "A pointer to memory",
      "A data type"
    ],
    correctOptionIndex: 1,
    explanation: "The 'this' keyword refers to the current object within instance methods.",
    difficulty: "Easy"
  },
  {
    topic: "OOPS",
    questionNumber: 17,
    question: "What is SOLID principles?",
    options: [
      "A type of material",
      "Design principles: Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion",
      "Software licensing",
      "A data structure"
    ],
    correctOptionIndex: 1,
    explanation: "SOLID are 5 OOP design principles for maintainable, scalable code.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 18,
    question: "What is the copy constructor?",
    options: [
      "A constructor that copies a class",
      "A constructor that creates a new object as a copy of an existing object",
      "A method for duplication",
      "A type of inheritance"
    ],
    correctOptionIndex: 1,
    explanation: "A copy constructor creates a new object with the same values as an existing object.",
    difficulty: "Medium"
  },
  {
    topic: "OOPS",
    questionNumber: 19,
    question: "What is virtual method?",
    options: [
      "A method that doesn't exist",
      "A method that can be overridden in subclasses, with runtime binding",
      "A method on the internet",
      "An abstract method only"
    ],
    correctOptionIndex: 1,
    explanation: "Virtual methods allow dynamic dispatch in languages like C++.",
    difficulty: "Hard"
  },
  {
    topic: "OOPS",
    questionNumber: 20,
    question: "What is the Liskov Substitution Principle?",
    options: [
      "A mathematical formula",
      "Derived classes should be substitutable for base classes without breaking functionality",
      "A sorting algorithm",
      "A type of inheritance"
    ],
    correctOptionIndex: 1,
    explanation: "LSP ensures that subclass instances can replace parent class instances.",
    difficulty: "Hard"
  },

  // Behavioral/HR (20 questions)
  {
    topic: "Behavioral/HR",
    questionNumber: 1,
    question: "Tell me about a time you overcame a difficult challenge at work.",
    options: [
      "Response should focus on the problem, your solution, and the outcome learned",
      "Talk about difficult coworkers without blaming",
      "Discuss personal life challenges only",
      "Give a generic answer without specifics"
    ],
    correctOptionIndex: 0,
    explanation: "Use STAR method (Situation, Task, Action, Result) to provide structured, relevant examples.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 2,
    question: "What is your strength in team collaboration?",
    options: [
      "Never asking for help to seem independent",
      "Active listening, clear communication, supporting teammates, and achieving common goals",
      "Always being the leader",
      "Minimizing interaction with team members"
    ],
    correctOptionIndex: 1,
    explanation: "Strong collaboration involves communication, support, and shared responsibility.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 3,
    question: "How do you handle disagreement with your manager?",
    options: [
      "Avoid bringing it up",
      "Approach respectfully with data/reasoning, listen to their perspective, find common ground",
      "Escalate immediately to HR",
      "Agree regardless of your opinion"
    ],
    correctOptionIndex: 1,
    explanation: "Professional disagreement requires respect, evidence, and good communication.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 4,
    question: "What do you do when you make a mistake?",
    options: [
      "Hide it and hope nobody notices",
      "Accept responsibility, understand root cause, communicate, and implement solutions",
      "Blame others",
      "Minimize its importance"
    ],
    correctOptionIndex: 1,
    explanation: "Accountability and learning from mistakes are highly valued professional traits.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 5,
    question: "Describe your approach to learning new technologies.",
    options: [
      "Refusing to learn new things",
      "Curiosity, research, practice, applying to real problems, and continuous improvement",
      "Only learning when forced to",
      "Memorizing without understanding"
    ],
    correctOptionIndex: 1,
    explanation: "Growth mindset and proactive learning are essential in tech careers.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 6,
    question: "How do you prioritize when you have multiple urgent tasks?",
    options: [
      "Working on whatever comes first",
      "Assessing impact, deadline, dependencies, communicating with stakeholders, and organizing workload",
      "Ignoring less visible tasks",
      "Doing everything simultaneously"
    ],
    correctOptionIndex: 1,
    explanation: "Effective prioritization requires assessment of business impact and deadlines.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 7,
    question: "What motivates you in your career?",
    options: [
      "Only salary and benefits",
      "Impact, growth, solving problems, continuous learning, team environment, and meaningful work",
      "Power and status only",
      "Avoiding difficult problems"
    ],
    correctOptionIndex: 1,
    explanation: "Multifaceted motivation leads to sustainable engagement and growth.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 8,
    question: "How do you communicate technical concepts to non-technical people?",
    options: [
      "Using complex jargon",
      "Simplifying concepts, using analogies, asking questions, and checking understanding",
      "Assuming they already understand",
      "Providing only technical details"
    ],
    correctOptionIndex: 1,
    explanation: "Clear communication bridges the gap between technical and non-technical stakeholders.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 9,
    question: "Tell about a time you received critical feedback.",
    options: [
      "Avoid giving examples",
      "Show you listened, understood the concern, made improvements, and appreciated the feedback",
      "Explain why the feedback was wrong",
      "Get defensive"
    ],
    correctOptionIndex: 1,
    explanation: "Receptiveness to feedback demonstrates maturity and commitment to growth.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 10,
    question: "What's your approach to work-life balance?",
    options: [
      "Working all the time without breaks",
      "Setting boundaries, managing time effectively, prioritizing health, and maintaining productivity",
      "Ignoring work responsibilities",
      "Never working extra hours"
    ],
    correctOptionIndex: 1,
    explanation: "Sustainable careers require balance and well-being alongside performance.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 11,
    question: "How do you handle working with difficult team members?",
    options: [
      "Avoiding them completely",
      "Understanding their perspective, finding common ground, communicating clearly, and escalating if needed",
      "Complaining to others",
      "Becoming hostile"
    ],
    correctOptionIndex: 1,
    explanation: "Professional maturity includes handling interpersonal challenges constructively.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 12,
    question: "Describe a situation where you had to adapt quickly.",
    options: [
      "Give a vague response",
      "Show flexibility, quick thinking, communication, execution, and positive attitude during change",
      "Resist change",
      "Blame circumstances"
    ],
    correctOptionIndex: 1,
    explanation: "Adaptability is crucial in fast-changing tech environments.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 13,
    question: "What do you do when you're unsure how to proceed on a task?",
    options: [
      "Guess and hope for the best",
      "Ask clarifying questions, research, seek mentorship, and communicate progress",
      "Work in isolation until you figure it out",
      "Give up"
    ],
    correctOptionIndex: 1,
    explanation: "Seeking help and clarity demonstrates good judgment and teamwork.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 14,
    question: "How do you ensure code quality in your work?",
    options: [
      "Skipping code review to save time",
      "Writing tests, peer review, refactoring, following standards, and continuous improvement",
      "Assuming it works once deployed",
      "Only focusing on completion"
    ],
    correctOptionIndex: 1,
    explanation: "Quality mindset ensures maintainable, reliable code.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 15,
    question: "Tell about a project where you failed. What did you learn?",
    options: [
      "Never mention failures",
      "Be honest about the failure, explain what you learned, and how you've applied it since",
      "Blame others for the failure",
      "Dismiss the failure as unimportant"
    ],
    correctOptionIndex: 1,
    explanation: "Learning from failures demonstrates resilience and maturity.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 16,
    question: "How do you approach code documentation?",
    options: [
      "Skipping documentation to code faster",
      "Clear, concise docs explaining 'why', complex logic, APIs, and usage examples",
      "Only documenting when required",
      "Over-documenting every line"
    ],
    correctOptionIndex: 1,
    explanation: "Good documentation ensures maintainability and knowledge transfer.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 17,
    question: "What's your approach when assigned a task outside your expertise?",
    options: [
      "Refusing the assignment",
      "Embracing the challenge, researching, asking for guidance, and aiming to learn",
      "Procrastinating until someone else helps",
      "Doing it poorly without effort to learn"
    ],
    correctOptionIndex: 1,
    explanation: "Growth mindset drives success in new areas.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 18,
    question: "How do you keep yourself updated with industry trends?",
    options: [
      "Ignoring new developments",
      "Reading blogs, attending conferences, experimenting with technologies, and joining communities",
      "Only learning what's required for current job",
      "Following outdated practices"
    ],
    correctOptionIndex: 1,
    explanation: "Continuous learning is essential in rapidly evolving tech.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 19,
    question: "Tell about a time you mentored or helped a colleague grow.",
    options: [
      "Never helping others",
      "Share mentoring experience, impact on colleague's growth, and satisfaction from helping",
      "Only mentoring when required",
      "Keeping knowledge to yourself"
    ],
    correctOptionIndex: 1,
    explanation: "Helping others grow demonstrates leadership and team commitment.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 20,
    question: "Why do you want to work for this company?",
    options: [
      "Just for the salary",
      "Research company mission, culture, growth, impact, and how you can contribute",
      "No specific reason",
      "Any job will do"
    ],
    correctOptionIndex: 1,
    explanation: "Genuine interest in the company shows professionalism and motivation.",
    difficulty: "Easy"
  },
  // Additional Behavioral/HR Questions (10 Easy)
  {
    topic: "Behavioral/HR",
    questionNumber: 21,
    question: "Tell about a time you had to learn something new quickly.",
    options: [
      "I don't like learning new things",
      "I broke it down into manageable parts, found resources, practiced, and applied what I learned",
      "I waited for someone to teach me",
      "I gave up if it was too hard"
    ],
    correctOptionIndex: 1,
    explanation: "Quick learning ability is crucial in tech where changes happen rapidly.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 22,
    question: "How do you stay organized and manage your time?",
    options: [
      "I don't use any system",
      "I use tools, create prioritized to-do lists, set deadlines, and review regularly",
      "I rely on my memory",
      "Organization is not important"
    ],
    correctOptionIndex: 1,
    explanation: "Good time management improves productivity and reduces stress.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 23,
    question: "What would you do if you made a mistake at work?",
    options: [
      "Hide it and hope no one notices",
      "Own it immediately, explain what happened, fix it, and prevent recurrence",
      "Blame someone else",
      "Hope it doesn't affect anything"
    ],
    correctOptionIndex: 1,
    explanation: "Integrity and accountability are essential professional traits.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 24,
    question: "How do you contribute to team success?",
    options: [
      "Focus only on my own work",
      "Collaborate, share knowledge, support teammates, communicate, and celebrate team wins",
      "Take credit for team efforts",
      "Don't contribute beyond requirements"
    ],
    correctOptionIndex: 1,
    explanation: "Team success heavily depends on individual contributions and collaboration.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 25,
    question: "How do you handle working under pressure or tight deadlines?",
    options: [
      "I panic and freeze",
      "I prioritize clearly, focus on essentials, communicate status, and deliver quality even under pressure",
      "I give up easily",
      "I procrastinate more"
    ],
    correctOptionIndex: 1,
    explanation: "Pressure management is a key skill for professional success.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 26,
    question: "Tell about a project you're proud of.",
    options: [
      "I haven't done anything noteworthy",
      "Describe the challenge, your role, technical work, impact, and lessons learned",
      "Exaggerate your contributions",
      "Mention a project but take minimal responsibility"
    ],
    correctOptionIndex: 1,
    explanation: "Portfolio and accomplishments demonstrate your capabilities and growth.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 27,
    question: "How do you approach solving a problem you've never faced before?",
    options: [
      "I wait for someone to tell me what to do",
      "I research, break it into parts, try different approaches, learn from setbacks, and iterate",
      "I avoid complex problems",
      "I assume it's impossible"
    ],
    correctOptionIndex: 1,
    explanation: "Problem-solving mindset distinguishes effective engineers.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 28,
    question: "What's your view on asking for help?",
    options: [
      "Asking for help shows weakness",
      "Asking for help when stuck is smart; it saves time and prevents bad solutions",
      "I should always know the answer",
      "I would rather deliver poor results than ask"
    ],
    correctOptionIndex: 1,
    explanation: "Knowing when to ask for help demonstrates confidence and wisdom.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 29,
    question: "How do you respond when a colleague disagrees with your approach?",
    options: [
      "I insist I'm right",
      "I listen carefully, explain my reasoning, consider their perspective, and find the best solution",
      "I get upset and take it personally",
      "I refuse to discuss it"
    ],
    correctOptionIndex: 1,
    explanation: "Healthy disagreement leads to better solutions when handled professionally.",
    difficulty: "Easy"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 30,
    question: "How do you celebrate success as a team?",
    options: [
      "Success doesn't matter",
      "Acknowledge achievements, celebrate milestones, recognize contributions, and use success to build momentum",
      "Only celebrate if I personally succeed",
      "Success is expected; no need to celebrate"
    ],
    correctOptionIndex: 1,
    explanation: "Celebrating success boosts morale and strengthens team bonds.",
    difficulty: "Easy"
  },
  // Additional Behavioral/HR Questions (10 Medium)
  {
    topic: "Behavioral/HR",
    questionNumber: 31,
    question: "Tell about a time when you had to negotiate with someone to reach a compromise.",
    options: [
      "I always insist on my way",
      "I understand both perspectives, find common ground, propose win-win solutions, and maintain relationships",
      "I avoid negotiations",
      "I let others decide everything"
    ],
    correctOptionIndex: 1,
    explanation: "Negotiation and compromise skills are essential for collaboration.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 32,
    question: "Describe a time you had to deliver bad news to stakeholders.",
    options: [
      "I try to hide bad news as long as possible",
      "I communicate early and honestly with context, impact, mitigation plan, and clear timeline",
      "I exaggerate the problem",
      "I avoid responsibility"
    ],
    correctOptionIndex: 1,
    explanation: "Transparency in communication, especially with bad news, builds trust.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 33,
    question: "How have you driven innovation in your previous role?",
    options: [
      "I just follow requirements without innovation",
      "I identified inefficiencies, proposed improvements, experimented, and implemented solutions",
      "Innovation is someone else's job",
      "I resist new ideas"
    ],
    correctOptionIndex: 1,
    explanation: "Innovation requires initiative and willingness to challenge status quo.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 34,
    question: "Tell about a time you had to work with someone from a different background or culture.",
    options: [
      "I avoid working with people who are different",
      "I was curious, respected differences, adapted communication, and built understanding",
      "Cultural differences are always problems",
      "I made assumptions about them"
    ],
    correctOptionIndex: 1,
    explanation: "Cultural awareness and inclusivity are crucial in global workplaces.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 35,
    question: "How do you balance technical depth with breadth of knowledge?",
    options: [
      "Only go deep in one area, ignore everything else",
      "Develop expertise in core areas while staying current with broader trends and learning related skills",
      "Try to know everything equally well",
      "Avoid learning new things"
    ],
    correctOptionIndex: 1,
    explanation: "T-shaped skills (depth + breadth) make engineers more valuable and flexible.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 36,
    question: "Tell about a time you mentored someone or helped their growth.",
    options: [
      "I don't have time for mentoring",
      "I identified their potential, provided guidance, shared knowledge, and tracked their progress",
      "I only help if forced to",
      "I keep knowledge to myself"
    ],
    correctOptionIndex: 1,
    explanation: "Mentoring develops leadership skills and strengthens team capability.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 37,
    question: "How do you approach code reviews - both giving and receiving?",
    options: [
      "I don't take feedback on my code personally",
      "I give constructive feedback, explain reasoning, acknowledge good work, and am receptive to suggestions for improvement",
      "Code reviews are waste of time",
      "I take all feedback as personal criticism"
    ],
    correctOptionIndex: 1,
    explanation: "Professional code reviews improve code quality and team learning.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 38,
    question: "Tell about a time you had to say 'no' to an unrealistic request.",
    options: [
      "I always say yes to avoid conflict",
      "I explain constraints, propose alternatives, offer timeline for delivery, and stay professional",
      "I say no harshly without explanation",
      "I do it poorly to prove it won't work"
    ],
    correctOptionIndex: 1,
    explanation: "Setting realistic expectations prevents burnout and maintains credibility.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 39,
    question: "How do you stay motivated when working on repetitive or boring tasks?",
    options: [
      "I just suffer through it",
      "I focus on purpose, automate if possible, break into milestones, and find meaning in the outcome",
      "Motivation doesn't matter",
      "I do minimal work on boring tasks"
    ],
    correctOptionIndex: 1,
    explanation: "Finding motivation in any task demonstrates professionalism and maturity.",
    difficulty: "Medium"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 40,
    question: "Tell about a time you reversed a previous decision.",
    options: [
      "I never admit I was wrong",
      "I acknowledged new information, explained the change, communicated clearly, and moved forward",
      "I hide the reversal",
      "I blame someone else for the change"
    ],
    correctOptionIndex: 1,
    explanation: "Reversing decisions when new information emerges shows wisdom and flexibility.",
    difficulty: "Medium"
  },
  // Additional Behavioral/HR Questions (10 Hard)
  {
    topic: "Behavioral/HR",
    questionNumber: 41,
    question: "Tell about a time you had to make a decision with incomplete information.",
    options: [
      "I wait for perfect information even if it delays decision",
      "I gathered available data, identified risks, made decision with contingency plans, and monitored results",
      "I guess randomly",
      "I avoid making decisions"
    ],
    correctOptionIndex: 1,
    explanation: "Leadership often requires decisions under uncertainty; risk management is crucial.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 42,
    question: "Describe a time you had to influence someone without direct authority.",
    options: [
      "Influence requires direct authority",
      "I built relationships, understood their perspective, made compelling case, and found mutual benefits",
      "I coerce them into agreement",
      "I give up if I don't have authority"
    ],
    correctOptionIndex: 1,
    explanation: "Influence without authority requires emotional intelligence and credibility.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 43,
    question: "Tell about a situation where your values conflicted with business goals.",
    options: [
      "Values and business goals always align",
      "I identified the conflict, explored options, communicated concerns ethically, and found aligned solutions",
      "I compromise my values for business",
      "I sabotage business goals"
    ],
    correctOptionIndex: 1,
    explanation: "Ethical leadership involves standing by values while seeking constructive solutions.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 44,
    question: "How do you build psychological safety in your team?",
    options: [
      "Team members should fear mistakes",
      "Encourage experimentation, welcome ideas, acknowledge failures as learning, celebrate effort, and model vulnerability",
      "Control through fear and hierarchy",
      "Psychological safety is unnecessary"
    ],
    correctOptionIndex: 1,
    explanation: "Psychological safety is foundational to innovation and team performance.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 45,
    question: "Describe your leadership philosophy or approach.",
    options: [
      "Leadership is about power and control",
      "Focus on enabling others, creating conditions for success, developing people, and leading by example",
      "Do everything yourself",
      "Leadership is about being liked"
    ],
    correctOptionIndex: 1,
    explanation: "Effective leadership empowers others rather than controlling them.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 46,
    question: "Tell about a time you had to deliver feedback to senior leadership.",
    options: [
      "Never give feedback to senior leaders",
      "I prepared carefully, focused on impact and solutions, was respectful, and chose appropriate setting",
      "I complain publicly",
      "I deliver harsh feedback without context"
    ],
    correctOptionIndex: 1,
    explanation: "Upward feedback requires tact, preparation, and focus on improvement.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 47,
    question: "How do you handle organizational change as a leader or senior individual contributor?",
    options: [
      "Resist change to protect status quo",
      "Understand rationale, communicate vision, address concerns, model adaptability, and support team through transition",
      "Change is always bad",
      "Ignore change and continue old ways"
    ],
    correctOptionIndex: 1,
    explanation: "Change leadership requires clarity, empathy, and forward thinking.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 48,
    question: "Tell about a time you had to manage competing interests between teams.",
    options: [
      "One team's interests always matter more",
      "I understood each team's priorities, found common goals, negotiated fairly, and documented agreements",
      "I favor one team arbitrarily",
      "I let them fight it out"
    ],
    correctOptionIndex: 1,
    explanation: "Cross-team alignment requires understanding multiple perspectives and diplomacy.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 49,
    question: "How do you approach building trust in a new team or organization?",
    options: [
      "Trust is assumed automatically",
      "I listen first, follow through on commitments, admit mistakes, show competence, and invest in relationships",
      "Trust develops only after years",
      "I focus only on individual relationships"
    ],
    correctOptionIndex: 1,
    explanation: "Trust building requires consistency, competence, and genuine care over time.",
    difficulty: "Hard"
  },
  {
    topic: "Behavioral/HR",
    questionNumber: 50,
    question: "Tell about a time you failed significantly and what you learned.",
    options: [
      "I haven't failed significantly",
      "I owned it, analyzed root causes, identified lessons learned, implemented changes, and shared insights with others",
      "I blame external factors",
      "I avoid discussing failures"
    ],
    correctOptionIndex: 1,
    explanation: "Growth comes from failure; how you respond defines your character and learning.",
    difficulty: "Hard"
  }
];

async function seedTheoryQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing theory questions
    await Theory.deleteMany({});
    
    // Insert new questions
    await Theory.insertMany(theoryQuestions);
    
    console.log("\n 180 Theory Questions Added Successfully!");
    console.log("Distribution:");
    console.log("- Operating Systems: 20 questions");
    console.log("- DBMS: 20 questions");
    console.log("- Computer Networks: 20 questions");
    console.log("- OOPS: 20 questions");
    console.log("- Behavioral/HR: 50 questions (10 Easy, 10 Medium, 10 Hard, 20 original)")
    
    process.exit(0);
  } catch (err) {
    console.error("Error seeding theory questions:", err);
    process.exit(1);
  }
}

seedTheoryQuestions();
