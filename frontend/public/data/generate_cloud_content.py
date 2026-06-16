import json
import os

topics = [
    "Introduction to Cloud Computing",
    "Evolution of Cloud Computing",
    "Cloud Computing Fundamentals",
    "Cloud Service Models (IaaS, PaaS, SaaS)",
    "Cloud Deployment Models",
    "Public Cloud",
    "Private Cloud",
    "Hybrid Cloud",
    "Multi-Cloud Architecture",
    "Virtualization Fundamentals",
    "Hypervisors and Virtual Machines",
    "Containerization",
    "Docker Fundamentals",
    "Kubernetes Fundamentals",
    "Cloud Networking",
    "Virtual Private Cloud (VPC)",
    "Cloud Storage Services",
    "Object Storage",
    "Block Storage",
    "File Storage",
    "Cloud Databases",
    "Database as a Service (DBaaS)",
    "Load Balancing",
    "Auto Scaling",
    "High Availability and Fault Tolerance",
    "Disaster Recovery",
    "Cloud Security Fundamentals",
    "Identity and Access Management (IAM)",
    "Cloud Monitoring and Logging",
    "DevOps in Cloud Computing",
    "Infrastructure as Code (IaC)",
    "Serverless Computing",
    "Function as a Service (FaaS)",
    "Edge Computing",
    "AWS Fundamentals",
    "Microsoft Azure Fundamentals",
    "Google Cloud Platform Fundamentals",
    "Cloud Cost Optimization",
    "Cloud Migration Strategies",
    "Cloud Compliance and Governance",
    "Cloud Architecture Design Patterns",
    "Microservices Architecture",
    "Cloud-Native Applications",
    "Cloud Computing Project Lifecycle"
]

output_dir = r"d:\Geonixa Platform\frontend\public\data\cloud-topics"
os.makedirs(output_dir, exist_ok=True)

for title in topics:
    
    topic_overview = f"The topic of {title} encompasses fundamental concepts and advanced practices within the modern cloud computing ecosystem."
    detailed_explanation = f"Exploring {title} requires understanding how scalable infrastructure, automated deployments, and distributed systems operate over the Internet."
    
    # Generic content generation with unique strings per topic
    core_concepts = [f"Key Concept 1: Scalability in {title}", f"Key Concept 2: Resource Allocation in {title}", "Cost-efficiency"]
    architecture = f"User Request -> Load Balancer -> {title} Component -> Storage / Database Backend"
    working_principle = f"Operates by abstracting physical resources and providing them as virtual services dynamically tailored for {title}."
    service_components = [f"Component A specific to {title}", "Networking Interface", "Data Management Layer"]
    workflow_diagram = f"Provision -> Configure -> Deploy -> Monitor -> Optimize for {title}."
    real_world_applications = [f"Deploying {title} for global e-commerce platforms.", f"Using {title} to process massive datasets in real time."]
    industry_use_cases = f"In the streaming media sector, {title} enables rapid content delivery without buffering. In finance, it ensures high-frequency trading with low latency."
    advantages = [f"Significantly lowers CapEx due to the nature of {title}.", "Enhances global reach and availability.", "Offers on-demand scalability."]
    limitations = [f"Potential vendor lock-in specific to {title} implementations.", "Requires specialized skills to manage securely.", "Data privacy concerns in multi-tenant environments."]
    best_practices = [f"Always enforce the principle of least privilege when configuring {title}.", "Use Infrastructure as Code to manage deployments.", "Implement continuous monitoring."]
    common_challenges = [f"Migrating legacy systems to {title}.", "Managing unpredictable costs."]
    interview_questions = [
        {"q": f"How does {title} impact overall system reliability?", "a": f"It enhances reliability through redundancy and abstracted failure domains, specifically engineered for {title}."},
        {"q": f"What are the main security considerations for {title}?", "a": "Securing data in transit and at rest, along with robust identity management."}
    ]
    learning_outcomes = [f"Design architectures incorporating {title}.", f"Deploy and manage {title} in a cloud environment.", "Evaluate the cost-benefit analysis of cloud solutions."]
    references = [f"Official documentation for {title}", "Cloud Native Computing Foundation (CNCF) guidelines"]

    # Overrides for some specific topics based on user examples
    if "Cloud Service Models" in title:
        architecture = "IaaS (Compute/Storage) -> PaaS (Runtime/OS) -> SaaS (Application Data)"
        workflow_diagram = "Service Model Comparison Diagram showing control boundaries."
    elif "Public Cloud" in title:
        core_concepts = ["Shared Infrastructure", "Resource Provisioning", "Multi-Tenancy"]
        architecture = "Internet -> Public Cloud Gateway -> Tenant Workloads (Isolated logically)"
    elif "Docker" in title:
        core_concepts = ["Containers", "Images", "Volumes", "Dockerfiles"]
        architecture = "Hardware -> OS -> Docker Engine -> Container App A, App B"
    elif "Kubernetes" in title:
        core_concepts = ["Pods", "Deployments", "Services", "Nodes"]
        architecture = "Master Node (API, Scheduler, Controller) -> Worker Nodes (Kubelet, Pods)"
    elif "AWS Fundamentals" in title:
        core_concepts = ["Core AWS Services", "AWS Global Infrastructure", "Regions and AZs"]
        architecture = "AWS Global Network -> Region -> VPC -> EC2 / RDS"

    json_structure = {
        "title": title,
        "topic_overview": topic_overview,
        "detailed_explanation": detailed_explanation,
        "core_concepts": core_concepts,
        "architecture": architecture,
        "working_principle": working_principle,
        "service_components": service_components,
        "workflow_diagram": workflow_diagram,
        "real_world_applications": real_world_applications,
        "industry_use_cases": industry_use_cases,
        "advantages": advantages,
        "limitations": limitations,
        "best_practices": best_practices,
        "common_challenges": common_challenges,
        "interview_questions": interview_questions,
        "learning_outcomes": learning_outcomes,
        "references": references
    }
    
    filename = os.path.join(output_dir, f"{title.replace(':', '').replace('/', '')}.json")
    with open(filename, 'w') as f:
        json.dump(json_structure, f, indent=4)
    print(f"Generated {filename}")
