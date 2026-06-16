import json
import os

topics = [
    "Introduction to Machine Learning",
    "Types of Machine Learning",
    "Data Collection and Data Preparation",
    "Data Cleaning and Preprocessing",
    "Exploratory Data Analysis (EDA)",
    "Feature Engineering",
    "Feature Selection Techniques",
    "Train-Test Split and Cross Validation",
    "Supervised Learning",
    "Linear Regression",
    "Logistic Regression",
    "Decision Trees",
    "Random Forest",
    "Support Vector Machines (SVM)",
    "K-Nearest Neighbors (KNN)",
    "Naive Bayes Algorithm",
    "Unsupervised Learning",
    "K-Means Clustering",
    "Hierarchical Clustering",
    "Principal Component Analysis (PCA)",
    "Association Rule Mining",
    "Reinforcement Learning Basics",
    "Model Evaluation Metrics",
    "Hyperparameter Tuning",
    "Ensemble Learning",
    "Model Deployment",
    "MLOps Fundamentals",
    "Machine Learning Project Lifecycle"
]

output_dir = r"d:\Geonixa Platform\frontend\public\data\ml-topics"
os.makedirs(output_dir, exist_ok=True)

for title in topics:
    
    topic_overview = f"The topic of {title} is an essential part of the Machine Learning ecosystem, focusing on solving problems intelligently through data-driven approaches."
    detailed_explanation = f"Understanding {title} requires exploring its fundamental principles and implementation techniques, which allow machines to identify patterns and make decisions with minimal human intervention."
    
    if "Linear Regression" in title:
        core_concepts = ["Continuous Values", "Dependent and Independent Variables", "Line of Best Fit"]
        working_principle = "Fits a linear equation to observed data to predict a continuous outcome."
        algo_flow = "Initialize weights -> Compute predictions -> Calculate cost -> Update weights via Gradient Descent -> Repeat."
        architecture = "Data -> Hypothesis Function (y = mx + c) -> Cost Function (MSE) -> Optimization (Gradient Descent)."
        math_concepts = "y = \\beta_0 + \\beta_1 X + \\epsilon. Mean Squared Error (MSE) is used to calculate loss."
    elif "Logistic Regression" in title:
        core_concepts = ["Binary Classification", "Probabilities", "Decision Boundary"]
        working_principle = "Uses a logistic function to model a binary dependent variable."
        algo_flow = "Calculate linear combination -> Apply Sigmoid -> Output Probability -> Threshold to Class."
        architecture = "Data -> Linear Equation -> Sigmoid Activation -> Probability Output (0 to 1)."
        math_concepts = "P(Y=1) = 1 / (1 + e^{-(\\beta_0 + \\beta_1 X)})."
    elif "Decision Trees" in title:
        core_concepts = ["Root Node", "Splitting", "Leaf Nodes", "Pruning"]
        working_principle = "Splits data iteratively based on feature values to maximize information gain."
        algo_flow = "Select best feature -> Split dataset -> Create child nodes -> Repeat until stopping criterion."
        architecture = "Root Node -> Decision Rules -> Internal Nodes -> Leaf Nodes (Predictions)."
        math_concepts = "Entropy = - \\sum p_i \\log_2(p_i). Information Gain = Entropy(parent) - Weighted_Sum(Entropy(children))."
    elif "Random Forest" in title:
        core_concepts = ["Bagging", "Ensemble Method", "Multiple Decision Trees", "Majority Voting"]
        working_principle = "Builds multiple decision trees on different data subsets and averages their predictions to prevent overfitting."
        algo_flow = "Bootstrap sampling -> Build trees independently -> Aggregate predictions (Mode for classification, Mean for regression)."
        architecture = "Training Data -> Multiple subsets -> Multiple Trees -> Aggregation -> Final Prediction."
        math_concepts = "Variance reduction by averaging predictions from low-correlation trees."
    elif "K-Means Clustering" in title:
        core_concepts = ["Centroids", "Distance Metrics", "Clusters", "Unsupervised Learning"]
        working_principle = "Partitions data into K distinct clusters based on feature similarity."
        algo_flow = "Initialize K centroids -> Assign points to nearest centroid -> Update centroids -> Repeat until convergence."
        architecture = "Unlabeled Data -> Distance Calculation -> Cluster Assignment -> Centroid Recalculation."
        math_concepts = "Minimizes Within-Cluster Sum of Squares (WCSS). Uses Euclidean distance metric."
    elif "PCA" in title:
        core_concepts = ["Dimensionality Reduction", "Variance", "Orthogonal Transformation"]
        working_principle = "Transforms correlated features into a smaller set of uncorrelated variables while retaining variance."
        algo_flow = "Standardize data -> Compute covariance matrix -> Calculate eigenvalues/eigenvectors -> Select top components."
        architecture = "High-Dimensional Data -> Covariance Matrix -> Eigen Decomposition -> Lower-Dimensional Projection."
        math_concepts = "Covariance Matrix C = (X^T X) / (n-1). Eigenvector equation: C v = \\lambda v."
    elif "Hyperparameter Tuning" in title:
        core_concepts = ["Grid Search", "Random Search", "Bayesian Optimization"]
        working_principle = "Systematically searches for the optimal configuration of model parameters that are not learned from data."
        algo_flow = "Define parameter space -> Select search strategy -> Train/Evaluate model -> Select best parameters."
        architecture = "Model Definition -> Parameter Grid -> Cross Validation -> Optimal Configuration."
        math_concepts = "Optimization of a black-box objective function f(x) over a hyperparameter space."
    elif "MLOps" in title:
        core_concepts = ["CI/CD for ML", "Model Registry", "Data Drift", "Monitoring"]
        working_principle = "Standardizes the deployment, monitoring, and maintenance of ML models in production."
        algo_flow = "Train -> Version -> Test -> Package -> Deploy -> Monitor -> Retrain."
        architecture = "Source Control -> CI Pipeline (Train/Test) -> Artifact Registry -> CD Pipeline (Deploy) -> Prod Environment."
        math_concepts = "Statistical tests for data drift (e.g., Kolmogorov-Smirnov test)."
    else:
        core_concepts = [f"Core principle of {title}", "Data representation", "Evaluation strategies"]
        working_principle = f"The working principle relies on algorithmic rules tailored to {title} to process input data."
        algo_flow = f"Step 1 -> Step 2 of {title} -> Final Output."
        architecture = f"Input -> {title} Processing Block -> Output/Insights."
        math_concepts = "Relevant statistical and algebraic formulas defining the objective function."

    real_world_applications = [
        f"Applying {title} in healthcare for predictive diagnostics.",
        f"Using {title} in finance to detect fraudulent transactions.",
        f"Implementing {title} in e-commerce for personalized recommendations."
    ]
    advantages = [
        f"Provides highly accurate insights when using {title}.",
        "Automates complex decision-making processes.",
        "Scalable across large volumes of data."
    ]
    disadvantages = [
        "Can be computationally expensive.",
        "Requires large amounts of high-quality data.",
        "Prone to overfitting if not tuned correctly."
    ]
    industry_use_cases = f"In manufacturing, {title} predicts equipment failure. In retail, it optimizes inventory management."
    best_practices = [
        f"Always normalize or standardize data before applying {title}.",
        "Use cross-validation to ensure model robustness.",
        "Monitor the model in production to catch data drift early."
    ]
    interview_questions = [
        {"q": f"How would you explain {title} to a non-technical stakeholder?", "a": f"I would explain that {title} is a method for finding patterns in historical data to make smart predictions about the future."},
        {"q": f"What are the main hyperparameters you would tune in {title}?", "a": "It depends on the specific algorithm used, but generally involves parameters controlling complexity and learning rate."}
    ]
    learning_outcomes = [
        f"Understand the theoretical mechanics of {title}.",
        f"Apply {title} to real-world datasets using Python libraries.",
        f"Evaluate the performance and limitations of {title}."
    ]
    
    json_structure = {
        "title": title,
        "topic_overview": topic_overview,
        "detailed_explanation": detailed_explanation,
        "core_concepts": core_concepts,
        "working_principle": working_principle,
        "algorithm_flow": algo_flow,
        "architecture_workflow": architecture,
        "mathematical_concepts": math_concepts,
        "real_world_applications": real_world_applications,
        "advantages": advantages,
        "disadvantages": disadvantages,
        "industry_use_cases": industry_use_cases,
        "best_practices": best_practices,
        "interview_questions": interview_questions,
        "learning_outcomes": learning_outcomes
    }
    
    filename = os.path.join(output_dir, f"{title.replace(':', '').replace('/', '')}.json")
    with open(filename, 'w') as f:
        json.dump(json_structure, f, indent=4)
    print(f"Generated {filename}")
