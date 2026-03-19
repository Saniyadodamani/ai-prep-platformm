import mongoose from "mongoose";
import dotenv from "dotenv";
import SystemDesignQuestion from "./models/SystemDesign.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB Connected ");

const systemDesignQuestions = [
  {
    title: "Design a URL Shortener (like Bitly)",
    description: "Design a service that allows users to create short URLs that redirect to long URLs. Handle millions of reads and writes with high availability.",
    functionalRequirements: [
      "Generate short URLs from long URLs",
      "Redirect users from short URL to original long URL",
      "Support custom short URLs",
      "URL expiration/deletion",
      "Redirect statistics and analytics"
    ],
    nonFunctionalRequirements: [
      "High availability and reliability",
      "Minimal latency (< 100ms)",
      "Support 100K new short URLs per day",
      "Support 1B+ redirects per month",
      "Scalable to millions of requests"
    ],
    interviewerExpectations: [
      "Clarify functional and non-functional requirements",
      "Back-of-the-envelope estimations",
      "High-level system design",
      "Database schema and indexing strategy",
      "Scalability discussion (load balancing, caching, sharding)"
    ],
    keyConsiderations: [
      "How to generate unique short URLs (base62 encoding, hash function)",
      "Database conflicts and collision handling",
      "Read-heavy system (10:1 read-write ratio)",
      "Caching strategy for hot URLs",
      "CDN usage for global redirects"
    ],
    architecture: {
      overview: "API servers → Load Balancer → Database (MySQL) + Cache (Redis) + Object Storage",
      components: [
        "API Server (REST endpoints for URL creation and redirection)",
        "Load Balancer (distribute traffic)",
        "MySQL Database (store mappings)",
        "Redis Cache (cache popular URLs)",
        "Zookeeper (distributed locks for short URL generation)",
        "Analytics Service (track clicks)"
      ],
      flow: "Long URL → Generate short URL (hash/encoding) → Store in DB → Return short URL → Access short URL → Lookup in Cache/DB → Redirect"
    },
    databaseSchema: `
URL Mapping Table:
- id (PK)
- original_url (indexed)
- short_url (unique indexed)
- username (indexed)
- created_at
- expiration_date
- custom_alias
    `,
    scalabilityApproach: "Use distributed key-value store (DynamoDB/Cassandra) instead of single database. Implement horizontal sharding by short URL hash. Cache hot URLs in Redis. Use CDN for redirects.",
    tradeOffs: [
      "Consistency vs Availability: Accept eventual consistency for better availability",
      "Short URL length vs Collision probability: Longer URLs reduce collisions",
      "Real-time analytics vs Performance: Use asynchronous analytics logging",
      "Single datacenter vs Global: Multi-region setup increases complexity"
    ],
    estimations: {
      throughput: "100K writes/day = 1.16 writes/sec, 1B reads/month = 385 reads/sec",
      storage: "100K URLs × 365 days × 5 years = 182.5M URLs × 500 bytes = ~100GB",
      latency: "Target <100ms: DB lookup (10ms) + Network (50ms)"
    },
    difficulty: "Medium",
    category: "URL & Web Services",
    relatedTopics: ["Distributed Systems", "Caching", "Database Design"]
  },
  {
    title: "Design a Chat Application (like WhatsApp)",
    description: "Design a real-time messaging application supporting one-to-one and group chats with message delivery guarantees and user online/offline status.",
    functionalRequirements: [
      "One-to-one and group messaging",
      "Message delivery (sent, delivered, read status)",
      "Online/offline user status",
      "Typing indicators",
      "Message search and history",
      "Push notifications"
    ],
    nonFunctionalRequirements: [
      "Low latency (<2 seconds)",
      "High availability and reliability",
      "Support billions of messages per day",
      "Scalable to 2B+ users",
      "Exactly-once message delivery"
    ],
    interviewerExpectations: [
      "Handle real-time communication",
      "Message queue implementation",
      "Database design for conversations",
      "Scalability to billions of users",
      "Failure modes and recovery mechanisms"
    ],
    keyConsiderations: [
      "Message ordering in group chats",
      "Handling offline users (push notifications, message queuing)",
      "Presence service for online status",
      "Handling duplicate messages",
      "End-to-end encryption considerations"
    ],
    architecture: {
      overview: "WebSocket/gRPC Servers → Message Queue (Kafka) → Database (MongoDB) → Cache (Redis) → Push Notification Service",
      components: [
        "API Server (HTTPS)",
        "WebSocket Server (real-time connection)",
        "Message Queue (handle message delivery)",
        "Presence Service (track online status)",
        "Database (store messages and conversations)",
        "Cache (hot conversations)",
        "Push Notification Service"
      ],
      flow: "User A sends message → WebSocket → Message Queue → Store in DB → Send to User B (if online) or Queue for later → User B receives → Delivery confirmation"
    },
    databaseSchema: `
Users Table: id, username, phone, status, last_seen
Conversations Table: id, participants, created_at, updated_at
Messages Table: id (PK), conversation_id (indexed), sender_id, content, timestamp (indexed), status, media_url
    `,
    scalabilityApproach: "Use Kafka for reliable message delivery. Shard conversations by conversation_id. Use NoSQL (MongoDB) for flexible schema. Cache active conversations in Redis. Separate presence service using Hazelcast.",
    tradeOffs: [
      "Consistency vs Latency: Accept eventual consistency for low latency",
      "Storage vs Indexing: More indexes improve read speed but slow writes",
      "Single datacenter vs Global: Multi-region increases complexity",
      "Full message history vs Storage: Archive old messages"
    ],
    estimations: {
      throughput: "1M users × 15 messages/day = 15M messages/day = 174 messages/sec",
      storage: "15M messages/day × 1KB avg size = 15GB/day = 5.5TB/year",
      latency: "Target <2sec: Server processing (50ms) + Network (1.5sec) + Storage (100ms)"
    },
    difficulty: "Hard",
    category: "Real-time Messaging",
    relatedTopics: ["Real-time Systems", "Message Queues", "Presence Service"]
  },
  {
    title: "Design a News Feed System (like Facebook)",
    description: "Design a news feed that displays posts from users that the current user follows, with efficient retrieval and ranking.",
    functionalRequirements: [
      "Post creation and updates",
      "Follow/unfollow users",
      "Generate personalized news feed",
      "Like and comment on posts",
      "Search and filter feed",
      "Real-time feed updates"
    ],
    nonFunctionalRequirements: [
      "Low latency (<200ms for feed generation)",
      "Support 2B+ users with 1M+ concurrent users",
      "High availability",
      "Scalable for daily 5B+ API calls",
      "Support 50M+ posts per day"
    ],
    interviewerExpectations: [
      "Push vs Pull model understanding",
      "Caching and pre-computation strategy",
      "Fan-out at write/read approaches",
      "Ranking and personalization algorithms",
      "Scalability to billions of users"
    ],
    keyConsiderations: [
      "Push model for frequent posters, Pull for sparse posters",
      "Use message queue to handle fan-out",
      "Cache recent posts for popular users",
      "Ranking algorithm (recency, engagement, relevance)",
      "Handling inactive users efficiently"
    ],
    architecture: {
      overview: "API Servers → Load Balancer → Feed Service → Message Queue → Cache (Redis) → Database (MySQL/Cassandra) → Search Index (Elasticsearch)",
      components: [
        "Web Server (handles API requests)",
        "Feed Generation Service",
        "Message Queue (for fan-out)",
        "Cache Service (hot feed cache)",
        "Database (posts, user relationships)",
        "Search Service (Elasticsearch)",
        "Real-time Notification Service"
      ],
      flow: "User posts → Fan-out to followers → Store in followers' cache → User opens feed → Retrieve from cache → Rank and format → Return to client"
    },
    databaseSchema: `
Users Table: id, username, bio, followers_count
UserFollow Table: user_id, follower_id, created_at (indexed)
Posts Table: id, user_id (indexed), content, timestamp (indexed), like_count
Feeds Table: id, user_id, post_id, timestamp (indexed)
    `,
    scalabilityApproach: "Push model for active users, Pull for inactive. Shard by user_id in database. Use consistent hashing for cache. Denormalize data for feed table. Implement async fan-out workers.",
    tradeOffs: [
      "Push vs Pull: Push better for active users, Pull for inactive",
      "Consistency vs Latency: Accept eventual consistency",
      "Real-time vs Stale data: Cache data up to few seconds",
      "Personalization accuracy vs Speed: Simple ranking vs ML models"
    ],
    estimations: {
      throughput: "2B users × 5 posts/day = 10B posts/day = 115K posts/sec writes",
      storage: "2B users × 500 feeds × 100 bytes = 100TB, use Cassandra",
      latency: "Target <200ms: Cache lookup (1ms) + App logic (50ms) + Network (100ms)"
    },
    difficulty: "Hard",
    category: "Social Networks",
    relatedTopics: ["Caching", "Message Queues", "Ranking Algorithms"]
  },
  {
    title: "Design a Video Streaming System (like YouTube)",
    description: "Design a platform for uploading, storing, processing, and streaming videos to millions of users globally.",
    functionalRequirements: [
      "Upload video files",
      "Process and transcode videos",
      "Stream videos with quality adaptation",
      "Support pause, resume, seek",
      "Comments and likes on videos",
      "Search and recommendations"
    ],
    nonFunctionalRequirements: [
      "Support 1B+ hours watched per day",
      "Low latency streaming (<5 seconds startup time)",
      "High availability (99.9% uptime)",
      "Support 1000+ concurrent streams per server",
      "Adaptive bitrate streaming (ABR)"
    ],
    interviewerExpectations: [
      "Video transcoding pipeline design",
      "CDN usage and edge computing",
      "Adaptive bitrate streaming (HLS/DASH)",
      "Storage architecture for massive video files",
      "Real-time encoding and processing"
    ],
    keyConsiderations: [
      "Transcoding at multiple bitrates/resolutions",
      "Use CDN for geographically distributed delivery",
      "Implement adaptive bitrate based on network",
      "Handle video corruption and retries",
      "Monitor and log video quality metrics"
    ],
    architecture: {
      overview: "Upload Service → Transcoding Service → Storage (S3/GCS) → CDN → Streaming Servers → Client Player",
      components: [
        "API Server (upload and playback endpoints)",
        "Queue System (transcode job queue)",
        "Transcoding Service (ffmpeg workers)",
        "Object Storage (S3/Google Cloud Storage)",
        "CDN (CloudFront/Akamai)",
        "Metadata Database (video info, user watch history)",
        "Cache Service (popular videos)"
      ],
      flow: "User uploads → Validate → Queue transcode → Process at multiple bitrates → Store variants → Register with CDN → User plays → Stream via CDN → Adapt quality"
    },
    databaseSchema: `
Videos Table: id, user_id, title, duration, upload_date, status
VideoSegments Table: video_id, resolution, bitrate, file_path, size
UserWatch History: user_id, video_id, watch_time, resume_position
    `,
    scalabilityApproach: "Distribute transcoding across multiple regions. Use object storage with CDN. Implement progressive download and streaming. Cache segments at edge. Horizontally scale transcoding workers.",
    tradeOffs: [
      "Transcoding speed vs Quality: More time gives better quality",
      "Storage vs Bandwidth: Pre-transcode vs On-demand",
      "CDN cost vs Latency: More CDN locations reduce latency",
      "Adaptive bitrate accuracy vs Complexity: Simple vs ML-based"
    ],
    estimations: {
      throughput: "1B hours/day = 41M concurrent viewers avg, 1000+ videos uploaded/min",
      storage: "500 hours/day upload × 5MB/min = 150TB/day, with 1000 bitrates = 150PB storage",
      latency: "Target <5sec: Transcode (varies), CDN cache lookup (50ms), Network (1-3sec)"
    },
    difficulty: "Hard",
    category: "Media & Streaming",
    relatedTopics: ["CDN", "Transcoding", "Streaming Protocols"]
  },
  {
    title: "Design a Photo Sharing System (like Instagram)",
    description: "Design a platform for users to upload, share, and discover photos with social features like likes, comments, and followers.",
    functionalRequirements: [
      "Upload and share photos",
      "Follow/unfollow users",
      "Like and comment on photos",
      "Search and explore photos",
      "User profiles and timelines",
      "Direct messaging"
    ],
    nonFunctionalRequirements: [
      "Support 100M+ daily active users",
      "Handle 100M new photos per day",
      "Low latency (<100ms) for feed loading",
      "High availability (99.99% uptime)",
      "Eventual consistency acceptable"
    ],
    interviewerExpectations: [
      "Image processing and thumbnail generation",
      "Feed ranking and personalization",
      "Building social graph efficiently",
      "Scalability to 100M+ users",
      "Real-time notifications"
    ],
    keyConsiderations: [
      "Image compression and multiple resolutions",
      "Use CDN for fast image delivery",
      "Social graph storage and traversal",
      "Ranking feed by engagement (likes, comments, follows)",
      "Activity notifications in real-time"
    ],
    architecture: {
      overview: "API Server → Image Processing Service → Object Storage (S3) → CDN → Feed Service → Database → Cache (Redis)",
      components: [
        "API Server (REST endpoints)",
        "Image Service (compression, resizing, filtering)",
        "Object Storage (preserve original + thumbnails)",
        "CDN (fast image delivery)",
        "Feed Service (personalized feed)",
        "Database (MySQL/Cassandra)",
        "Message Queue (notifications, processing)"
      ],
      flow: "User uploads photo → Validate → Generate thumbnails → Store in S3 → Register with CDN → Update followers' feeds → Broadcast notification"
    },
    databaseSchema: `
Photos Table: id, user_id, upload_date, caption, hashtags, cdn_url
UserFollow Table: user_id, follower_id
Likes Table: photo_id, user_id, timestamp
Comments Table: id, photo_id, user_id, text, timestamp
    `,
    scalabilityApproach: "Use object storage for photo files. Distribute image processing across workers. Cache hot photos. Implement feed ranking with machine learning. Use Cassandra for massive scale.",
    tradeOffs: [
      "Image quality vs Storage size: Compress aggressively",
      "Real-time vs Eventual consistency: Accept slight delays",
      "Personalization complexity vs Speed: Simple ranking for faster response",
      "Storage regions vs Latency: Distribute globally"
    ],
    estimations: {
      throughput: "100M DAU × 2 photos/day = 200M uploads/day = 2,314 uploads/sec",
      storage: "200M photos/day × 2MB = 400TB/day = 146PB/year",
      latency: "Target <100ms: Image processing (1-2sec) + CDN (10-50ms)"
    },
    difficulty: "Medium",
    category: "Media & Streaming",
    relatedTopics: ["Image Processing", "CDN", "Social Graphs"]
  },
  {
    title: "Design a Ride Sharing System (like Uber)",
    description: "Design a platform that matches drivers with riders, manages locations, handles payments, and maintains quality of service.",
    functionalRequirements: [
      "Match drivers with riders",
      "Real-time location tracking",
      "Estimate ride fare and time",
      "Payment processing",
      "Star ratings and reviews",
      "Driver and rider support"
    ],
    nonFunctionalRequirements: [
      "Match within 5 seconds",
      "Support 1M+ concurrent active riders/drivers",
      "Real-time location updates (<5 second latency)",
      "99.99% system availability",
      "Accurate geolocation accuracy (<100 meters)"
    ],
    interviewerExpectations: [
      "Spatial indexing and proximity queries",
      "Real-time location tracking system",
      "Matching algorithm design",
      "Handling payment at scale",
      "Scalability for multi-region deployment"
    ],
    keyConsiderations: [
      "Use QuadTree or GeoHash for spatial partitioning",
      "Publish-subscribe for real-time location updates",
      "Distributed transaction for payment + ride booking",
      "Handle surge pricing dynamically",
      "Fault tolerance for network partitions"
    ],
    architecture: {
      overview: "Location Service → Matching Service → Routing Service → Payment Gateway → Notification Service → Analytics",
      components: [
        "API Server (booking, tracking, payment)",
        "Location Service (real-time driver locations)",
        "Matching Service (match drivers to riders)",
        "Maps Service (routing, ETA calculation)",
        "Payment Service (process payments)",
        "Notification Service (SMS, push notifications)",
        "Analytics Service (monitoring, surge pricing)"
      ],
      flow: "Rider requests ride → Find nearby drivers → Match with driver → Share location → Calculate route → Update real-time → Complete ride → Payment → Rating"
    },
    databaseSchema: `
Users Table: id, name, type (driver/rider), rating
Rides Table: id, rider_id, driver_id, pickup, dropoff, fare, status, start_time
Payments Table: id, ride_id, amount, status, timestamp
Locations Table: user_id, latitude, longitude, timestamp (indexed)
    `,
    scalabilityApproach: "Partition locations by geohash. Use Redis for hot location cache. Distribute matching service by regions. Store ride history in data warehouse. Process payments asynchronously.",
    tradeOffs: [
      "Accuracy vs Latency: Lower frequency location updates for better latency",
      "Immediate matching vs Quality: Wait to find better match vs quick assignment",
      "Strong consistency for payment vs Eventual: Use compensating transactions",
      "Single region vs Multi-region: Multi-region adds complexity"
    ],
    estimations: {
      throughput: "1M riders × 5 rides/week = 714K rides/day = 8.2 rides/sec",
      storage: "714K rides/day × 1KB = 714MB/day = 260GB/year",
      latency: "Target <5sec match: Location lookup (100ms) + Matching (2sec) + Notification (2sec)"
    },
    difficulty: "Hard",
    category: "Location Services",
    relatedTopics: ["Geospatial Indexing", "Real-time Systems", "Payment Systems"]
  },
  {
    title: "Design a Microblogging System (like Twitter)",
    description: "Design a platform for users to post short messages, follow others, and discover trending topics.",
    functionalRequirements: [
      "Post tweets (text, media, links)",
      "Follow/unfollow users",
      "Like and retweet posts",
      "Search and trending topics",
      "User timelines and notifications",
      "Direct messaging"
    ],
    nonFunctionalRequirements: [
      "Support 300M+ users with 50M+ daily active",
      "Handle 600M tweets per day",
      "Low latency (<200ms) for timeline",
      "99.99% availability",
      "Real-time notifications"
    ],
    interviewerExpectations: [
      "Timeline feed with billions of tweets",
      "Trending algorithm design",
      "Handling spikes during major events",
      "Tweet replication and durability",
      "Real-time search and indexing"
    ],
    keyConsiderations: [
      "Use message queue for tweet distribution",
      "Implement pull-based feed generation",
      "Cache trending topics in memory",
      "Handle hashtag indexing and search",
      "Use Kafka for feed fan-out"
    ],
    architecture: {
      overview: "API Server → Message Queue (Kafka) → Feed Service → Database (Cassandra) → Cache (Redis) → Search (Elasticsearch) → Notification Service",
      components: [
        "API Server (tweet posting, timeline retrieval)",
        "Feed Service (generate personalized feed)",
        "Message Queue (handle tweet distribution)",
        "Database (store tweets and relationships)",
        "Cache (popular tweets and timelines)",
        "Search Engine (Elasticsearch for tweets and hashtags)",
        "Real-time Notification Service"
      ],
      flow: "User posts tweet → Validate → Queue to message broker → Fan-out to followers → Update cache → Index in search → Send notifications"
    },
    databaseSchema: `
Tweets Table: id, user_id, text, timestamp (indexed), like_count
UserFollow Table: user_id, follower_id
Hashtags Table: tag, tweet_id, timestamp (indexed)
Timelines Table: user_id, tweet_id, timestamp (indexed)
    `,
    scalabilityApproach: "Use Cassandra for write scalability. Implement timeline fanout asynchronously. Cache hot tweets in Redis. Use Elasticsearch for search. Pre-compute trending topics.",
    tradeOffs: [
      "Real-time consistency vs Availability: Accept eventual consistency",
      "Tweet visibility vs Latency: Immediate vs few seconds delay",
      "Search completeness vs Latency: Full-text vs approximate",
      "Notification reliability vs Cost: Increase replicas vs cost"
    ],
    estimations: {
      throughput: "600M tweets/day = 6,944 tweets/sec",
      storage: "600M tweets/day × 280 bytes = 168GB/day = 61TB/year",
      latency: "Target <200ms: DB lookup (50ms) + App logic (50ms) + Network (100ms)"
    },
    difficulty: "Hard",
    category: "Social Networks",
    relatedTopics: ["Message Queues", "Search Engine", "Trending Algorithms"]
  },
  {
    title: "Design a File Storage System (like Google Drive)",
    description: "Design a cloud storage platform that allows users to upload, store, and share files with proper versioning and access control.",
    functionalRequirements: [
      "Upload and download files",
      "Create folders and organize files",
      "File versioning and restore",
      "Share files and manage permissions",
      "Search files by name and metadata",
      "Delete and trash management"
    ],
    nonFunctionalRequirements: [
      "Support 1B+ users with 100M+ concurrent users",
      "Handle 1B+ files stored",
      "Low latency (<1 second) for operations",
      "99.99% availability and durability",
      "Support files up to 1TB in size"
    ],
    interviewerExpectations: [
      "Chunked upload for large files",
      "File deduplication and compression",
      "Distributed storage architecture",
      "Consistency and durability guarantees",
      "Recovering from failures"
    ],
    keyConsiderations: [
      "Split files into chunks for faster upload and deduplication",
      "Use content-addressable storage (CAM) with checksums",
      "Implement multi-version storage",
      "Access control lists (ACL) for sharing",
      "Background garbage collection for deleted files"
    ],
    architecture: {
      overview: "Upload Service → Block Storage → Metadata Service → Replication Service → Trash Service → Sharing Service",
      components: [
        "API Server (file operations)",
        "Upload Service (handle chunked uploads)",
        "Block Storage (store file blocks)",
        "Metadata Service (file info, hierarchy)",
        "Replication & Backup Service",
        "Sharing Service (ACL, permissions)",
        "Trash Service (soft delete)"
      ],
      flow: "User uploads → Chunk file → Store blocks → Generate metadata → Replicate → Return handle → User can download/share/version"
    },
    databaseSchema: `
Files Table: id, user_id, name, parent_id, size, mime_type, created_at
Blocks Table: block_id, content_hash, data, replica_count
FileMetadata Table: file_id, version, block_list, checksum, created_at
Permissions Table: file_id, user_id, permission_level
    `,
    scalabilityApproach: "Use distributed storage (GFS, HDFS, S3). Implement content deduplication with SHA-256. Use eventual consistency. Implement quorum writes for durability. Cache metadata.",
    tradeOffs: [
      "Deduplication vs Speed: Extra CPU for hashing",
      "Consistency vs Availability: Accept eventual consistency",
      "Versioning storage vs Cost: Limit versions",
      "Real-time sync vs Bandwidth: Batch changes"
    ],
    estimations: {
      throughput: "1B users × 1GB avg storage = 1EB total, 1GB upload/sec peak",
      storage: "1B users × 1GB = 1EB = 1000PB",
      latency: "Target <1sec: Upload (50ms-5sec for chunks) + Replication (100ms)"
    },
    difficulty: "Hard",
    category: "Storage Systems",
    relatedTopics: ["Distributed Storage", "Deduplication", "Replication"]
  },
  {
    title: "Design an API Rate Limiter",
    description: "Design a rate limiter that prevents abuse by limiting API requests from clients to specified thresholds.",
    functionalRequirements: [
      "Limit requests per user/IP address",
      "Support multiple rate limit algorithms",
      "Return 429 (Too Many Requests) when limit exceeded",
      "Provide rate limit headers in response",
      "Handle burst traffic gracefully"
    ],
    nonFunctionalRequirements: [
      "Process millions of requests per second",
      "Sub-millisecond latency for limiting checks",
      "High availability and fault tolerance",
      "Accurate rate limiting across distributed systems",
      "Minimal memory and CPU overhead"
    ],
    interviewerExpectations: [
      "Understanding of rate limiting algorithms (Token Bucket, Sliding Window, Leaky Bucket)",
      "Distributed rate limiting in microservices",
      "Handling edge cases (clock skew, distributed clocks)",
      "Scaling to millions of users",
      "Monitoring and alerting"
    ],
    keyConsiderations: [
      "Token Bucket algorithm for smooth rate limiting",
      "Sliding window counter for accuracy",
      "Distributed implementation using Redis",
      "Consider user tiers (free, premium, enterprise)",
      "Whitelist critical services"
    ],
    architecture: {
      overview: "API Gateway → Rate Limiter (Redis) → Backend Service",
      components: [
        "API Gateway (entry point)",
        "Rate Limiter Service (enforce limits)",
        "Cache Store (Redis for distributed state)",
        "Monitoring & Alerting (track violations)",
        "Configuration Service (manage rules)",
        "Fallback Handler (handle limit exceeded)"
      ],
      flow: "Request arrives → Check rate limiter → If allowed, forward → If denied, return 429 → Add rate-limit headers → Log violation"
    },
    databaseSchema: `
RateLimitConfig Table:
- user_id/api_key
- requests_per_second
- burst_size
- tier_level

RateLimitCounter Table (ephemeral in Redis):
- user_id
- tokens_available
- last_refill_time
    `,
    scalabilityApproach: "Use Redis for distributed state management. Implement local caching on gateway to reduce Redis calls. Use consistent hashing for scalability. Implement sliding window algorithm for accuracy.",
    tradeOffs: [
      "Accuracy vs Latency: Token bucket (fast) vs sliding window (accurate)",
      "Strict vs Loose: Over-limit slightly to avoid false positives",
      "Distributed consistency vs Availability: Use eventual consistency",
      "Per-user vs Per-IP: Depends on use case"
    ],
    estimations: {
      throughput: "1M API calls/sec, 1000 concurrent clients, 100 rate limit checks/sec per client",
      storage: "1M users × 1KB state = 1GB in Redis",
      latency: "Target <1ms: Redis lookup (0.1ms) + Token calculation (0.5ms)"
    },
    difficulty: "Medium",
    category: "Infrastructure",
    relatedTopics: ["Distributed Systems", "Caching", "Microservices"]
  },
  {
    title: "Design a Search Engine (like Google)",
    description: "Design a search engine that crawls the web, indexes documents, and returns relevant results for user queries.",
    functionalRequirements: [
      "Web crawling and indexing",
      "Query processing and ranking",
      "Handle typos and spell correction",
      "Support advanced search operators",
      "Return results in <100ms",
      "Update index with new content"
    ],
    nonFunctionalRequirements: [
      "Index 100B+ web pages",
      "Handle trillions of queries per year",
      "Sub-100ms query response time",
      "99.99% availability",
      "Support 1M+ QPS"
    ],
    interviewerExpectations: [
      "Web crawling strategy and freshness",
      "Inverted index structure and compression",
      "Ranking algorithms (PageRank, TF-IDF)",
      "Query parsing and expansion",
      "Infrastructure for massive scale"
    ],
    keyConsiderations: [
      "Efficient crawling with politeness (robots.txt, crawl delay)",
      "Build inverted indexes for fast lookup",
      "Implement PageRank for ranking quality",
      "Use MapReduce for batch processing",
      "Distributed query processing"
    ],
    architecture: {
      overview: "Web Crawler → Parser → Indexer → Rank Calculator → Query Engine → Result Aggregator",
      components: [
        "Crawler Service (distributed web crawling)",
        "Parser & Analyzer (extract content, remove HTML)",
        "Indexing Service (build inverted indexes)",
        "Rank Calculator (PageRank, quality metrics)",
        "Query Engine (process user queries)",
        "Query Suggester (autocomplete, spell check)",
        "Result Aggregator (combine and rank results)"
      ],
      flow: "Crawl web → Parse content → Build index → Rank pages → User enters query → Expand query → Search index → Rank results → Return to user"
    },
    databaseSchema: `
Documents Table:
- doc_id
- url
- title
- content
- page_rank
- last_crawled

InvertedIndex Table:
- term_id
- doc_id_list
- frequency

Links Table:
- source_doc_id
- target_doc_id
    `,
    scalabilityApproach: "Distribute crawling across thousands of machines. Use MapReduce for batch index building. Shard inverted index by hash(term). Implement replication for availability. Cache popular queries.",
    tradeOffs: [
      "Crawl freshness vs Resources: More resources = fresher index",
      "Index size vs Search speed: More detailed index = slower queries",
      "Ranking accuracy vs Speed: Complex ML models vs fast heuristics",
      "Real-time vs Batch: Batch indexing (faster) vs incremental (fresher)"
    ],
    estimations: {
      throughput: "100B pages × 5KB = 500PB to index, 1M QPS",
      storage: "500PB raw content, 50PB inverted index after compression",
      latency: "Target <100ms: Query (1ms) + Inverted index lookup (10ms) + Rank (50ms) + Network (30ms)"
    },
    difficulty: "Hard",
    category: "Search & Indexing",
    relatedTopics: ["Web Crawling", "Indexing", "Ranking Algorithms"]
  }
];

try {
  await SystemDesignQuestion.deleteMany();
  console.log("Old system design questions removed");

  await SystemDesignQuestion.insertMany(systemDesignQuestions);

  console.log(` ${systemDesignQuestions.length} System Design Questions Added Successfully`);
  process.exit();
} catch (err) {
  console.error(err);
  process.exit(1);
}
