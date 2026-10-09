import type { Bilingual, Lesson, Tier } from "../types";
export const b = (en: string, km: string): Bilingual => ({ en, km });
const q = (
  prompt: Bilingual,
  correct: Bilingual,
  wrong: Bilingual,
  explanation: Bilingual,
): Lesson["question"] => ({
  prompt,
  choices: [correct, wrong],
  answer: 0,
  explanation,
});
export const tiers: Tier[] = [
  {
    id: "intro",
    title: b("Introductory", "កម្រិតដំបូង"),
    subtitle: b("Build your intuition", "ស្វែងយល់ពីគំនិតមូលដ្ឋាន"),
    prerequisite: b(
      "No programming or mathematics background required.",
      "មិនត្រូវការចំណេះដឹងកម្មវិធី ឬគណិតវិទ្យាជាមុនទេ។",
    ),
    lessons: [
      {
        id: "patterns",
        title: b("01 · Learning from examples", "០១ · រៀនពីឧទាហរណ៍"),
        paragraphs: [
          b(
            "Traditional programming applies rules written by a person to data and produces answers. Supervised machine learning uses data and known answers to fit a model, then uses that model to predict answers for new data.",
            "កម្មវិធីប្រពៃណីយកច្បាប់ដែលមនុស្សសរសេរមកអនុវត្តលើទិន្នន័យ ដើម្បីផ្ដល់ចម្លើយ។ ការរៀនរបស់ម៉ាស៊ីនបែបមានការណែនាំ ប្រើទិន្នន័យ និងចម្លើយដែលដឹងរួច ដើម្បីបង្វឹកម៉ូដែល ហើយប្រើម៉ូដែលនោះទស្សន៍ទាយចម្លើយសម្រាប់ទិន្នន័យថ្មី។",
          ),
          b(
            "“Data + answers → rules” is a useful intuition for supervised learning, not a description of every ML paradigm. A learned rule is usually a set of numerical parameters, not a perfect human-readable rulebook.",
            "«ទិន្នន័យ + ចម្លើយ → ច្បាប់» ជាគំនិតងាយយល់សម្រាប់ការរៀនមានការណែនាំ ប៉ុន្តែមិនតំណាងឱ្យការរៀនគ្រប់ប្រភេទទេ។ ច្បាប់ដែលរៀនបាន ជាទូទៅជាប៉ារ៉ាម៉ែត្រជាលេខ មិនមែនជាសៀវភៅច្បាប់ដែលអានបាន និងត្រឹមត្រូវគ្រប់ពេលទេ។",
          ),
          b(
            "In this lab, six invented examples connect practice hours to a score. Train the line and watch prediction errors decrease. These examples illustrate fitting, not evidence that extra practice causes any particular score.",
            "ក្នុងលំហាត់នេះ ឧទាហរណ៍សិប្បនិម្មិតប្រាំមួយភ្ជាប់ម៉ោងហាត់ទៅនឹងពិន្ទុ។ បង្វឹកបន្ទាត់ ហើយមើលកំហុសថយចុះ។ នេះបង្ហាញការផ្គូផ្គងម៉ូដែល មិនមែនជាភស្តុតាងថាម៉ោងហាត់បន្ថែមបង្កឱ្យបានពិន្ទុជាក់លាក់ទេ។",
          ),
        ],
        diagram: "rules",
        lab: "regression",
        question: q(
          b(
            "What should we evaluate after fitting?",
            "តើគួរវាយតម្លៃអ្វីបន្ទាប់ពីបង្វឹក?",
          ),
          b(
            "Predictions on new, held-out examples",
            "ការទស្សន៍ទាយលើឧទាហរណ៍ថ្មីដែលទុកដាច់ដោយឡែក",
          ),
          b(
            "Only whether training errors are small",
            "មើលតែកំហុសលើទិន្នន័យបង្វឹក",
          ),
          b(
            "A model can memorize training examples and still fail on new ones.",
            "ម៉ូដែលអាចចងចាំឧទាហរណ៍បង្វឹក ហើយនៅតែខុសលើឧទាហរណ៍ថ្មី។",
          ),
        ),
      },
      {
        id: "paradigms",
        title: b("02 · Three ways to learn", "០២ · របៀបរៀនបីប្រភេទ"),
        paragraphs: [
          b(
            "The learning setup depends on what feedback is available. Choose it from your problem, not from which method sounds most advanced.",
            "របៀបរៀនអាស្រ័យលើព័ត៌មានឆ្លើយតបដែលមាន។ ជ្រើសរើសតាមបញ្ហារបស់អ្នក មិនមែនតាមរបៀបដែលស្ដាប់ទៅទំនើបជាងគេទេ។",
          ),
        ],
        bullets: [
          b(
            "Supervised learning: labeled input/output pairs. An email classifier learns from messages marked spam or not spam; a regressor predicts a number.",
            "ការរៀនមានការណែនាំ៖ មានគូទិន្នន័យបញ្ចូល និងចម្លើយដែលបានដាក់ស្លាក។ ម៉ូដែលអ៊ីមែលរៀនពីសារ ដែលសម្គាល់ថាជាសាររំខាន ឬមិនមែន។ ម៉ូដែលតម្លៃលេខទស្សន៍ទាយចំនួន។",
          ),
          b(
            "Unsupervised learning: no target labels. Cluster customers by purchasing patterns; the groups need human interpretation and do not automatically reveal someone’s identity or intent.",
            "ការរៀនគ្មានការណែនាំ៖ គ្មានស្លាកចម្លើយគោលដៅ។ អាចដាក់អតិថិជនជាក្រុមតាមលំនាំទិញ។ ក្រុមទាំងនេះត្រូវការការបកស្រាយពីមនុស្ស និងមិនប្រាប់អត្តសញ្ញាណ ឬបំណងដោយស្វ័យប្រវត្តិទេ។",
          ),
          b(
            "Reinforcement learning: an agent takes actions, observes outcomes, and learns from rewards across time. In a game, a delayed win can teach a sequence of actions; a poorly designed reward can teach undesirable behavior.",
            "ការរៀនតាមរង្វាន់៖ ភ្នាក់ងារធ្វើសកម្មភាព សង្កេតលទ្ធផល និងរៀនពីរង្វាន់តាមពេលវេលា។ ក្នុងល្បែង ការឈ្នះនៅចុងក្រោយអាចបង្រៀនលំដាប់សកម្មភាព។ រង្វាន់ដែលកំណត់មិនល្អអាចបង្រៀនអាកប្បកិរិយាមិនចង់បាន។",
          ),
        ],
        question: q(
          b(
            "Customer grouping without target labels is…",
            "ការដាក់អតិថិជនជាក្រុមដោយគ្មានស្លាកគោលដៅ គឺ…",
          ),
          b("Unsupervised learning", "ការរៀនគ្មានការណែនាំ"),
          b("Reinforcement learning", "ការរៀនតាមរង្វាន់"),
          b(
            "Clustering seeks structure; it does not require an action-and-reward loop.",
            "ការដាក់ជាក្រុមស្វែងរករចនាសម្ព័ន្ធ មិនត្រូវការវដ្ដសកម្មភាព និងរង្វាន់ទេ។",
          ),
        ),
      },
      {
        id: "impact",
        title: b(
          "03 · Useful systems, real limits",
          "០៣ · ប្រព័ន្ធមានប្រយោជន៍ និងដែនកំណត់",
        ),
        paragraphs: [
          b(
            "Image recognition can help sort crop photographs. Translation can support Khmer/English learning. Recommendations can help users find lessons. Autonomous navigation combines perception with planning and control.",
            "ការស្គាល់រូបភាពអាចជួយតម្រៀបរូបថតដំណាំ។ ការបកប្រែអាចគាំទ្រការរៀនខ្មែរ និងអង់គ្លេស។ ប្រព័ន្ធណែនាំអាចជួយរកមេរៀន។ ការរុករកស្វ័យប្រវត្តិរួមបញ្ចូលការយល់ឃើញ ការរៀបផែនការ និងការគ្រប់គ្រង។",
          ),
          b(
            "A prediction is not certainty. Models can inherit biased data, fail when conditions change, and expose private information if handled carelessly. Check results with people who understand the local context; keep humans responsible for consequential decisions.",
            "ការទស្សន៍ទាយមិនមែនជាភាពប្រាកដទេ។ ម៉ូដែលអាចទទួលភាពលម្អៀងពីទិន្នន័យ ខុសពេលស្ថានភាពផ្លាស់ប្ដូរ និងបង្ហាញព័ត៌មានឯកជនបើគ្រប់គ្រងមិនប្រុងប្រយ័ត្ន។ ពិនិត្យលទ្ធផលជាមួយអ្នកយល់បរិបទមូលដ្ឋាន និងទុកឱ្យមនុស្សទទួលខុសត្រូវលើសេចក្ដីសម្រេចសំខាន់។",
          ),
        ],
        question: q(
          b(
            "A high confidence score guarantees correctness?",
            "ពិន្ទុទំនុកចិត្តខ្ពស់ធានាភាពត្រឹមត្រូវមែនទេ?",
          ),
          b(
            "No; reliability must be evaluated",
            "ទេ ត្រូវវាយតម្លៃភាពជឿទុកចិត្ត",
          ),
          b("Yes, always", "បាទ ជានិច្ច"),
          b(
            "Scores may be miscalibrated, especially on unfamiliar data.",
            "ពិន្ទុអាចមិនឆ្លុះបញ្ចាំងភាពត្រឹមត្រូវ ជាពិសេសលើទិន្នន័យមិនធ្លាប់ឃើញ។",
          ),
        ),
      },
    ],
  },
  {
    id: "medium",
    title: b("Medium", "កម្រិតអនុវត្ត"),
    subtitle: b(
      "From data to a measured model",
      "ពីទិន្នន័យទៅម៉ូដែលដែលបានវាយតម្លៃ",
    ),
    prerequisite: b(
      "Comfort with basic algebra and reading Python examples.",
      "យល់ពីពិជគណិតមូលដ្ឋាន និងអាចអានឧទាហរណ៍ Python។",
    ),
    lessons: [
      {
        id: "pipeline",
        title: b(
          "04 · Build a trustworthy pipeline",
          "០៤ · បង្កើតដំណើរការដែលជឿទុកចិត្ត",
        ),
        paragraphs: [
          b(
            "Collect representative data with permission. Inspect missing values, duplicates, inconsistent units and labels. Design features that would actually be available at prediction time.",
            "ប្រមូលទិន្នន័យតំណាងដោយមានការអនុញ្ញាត។ ពិនិត្យតម្លៃខ្វះ ទិន្នន័យស្ទួន ឯកតា និងស្លាកមិនស្របគ្នា។ រៀបចំលក្ខណៈបញ្ចូលដែលពិតជាមាននៅពេលទស្សន៍ទាយ។",
          ),
          b(
            "Split before fitting transformations: training fits parameters, validation selects settings, and the test set provides the final untouched evaluation. Fit scalers and imputers only on training data. Keep the same person, school or time-dependent group out of multiple splits when appropriate.",
            "បែងចែកទិន្នន័យមុនកំណត់ការបម្លែង៖ ទិន្នន័យបង្វឹកកំណត់ប៉ារ៉ាម៉ែត្រ ទិន្នន័យផ្ទៀងផ្ទាត់ជ្រើសការកំណត់ និងទិន្នន័យតេស្តវាយតម្លៃចុងក្រោយ។ គណនាការកំណត់មាត្រដ្ឋាន និងបំពេញតម្លៃខ្វះពីទិន្នន័យបង្វឹកតែប៉ុណ្ណោះ។ ពេលសមស្រប កុំដាក់មនុស្ស សាលា ឬក្រុមតាមពេលវេលាដូចគ្នាក្នុងសំណុំផ្សេងៗ។",
          ),
          b(
            "For small datasets use cross-validation inside the training pool. Time series require chronological validation. A 60/20/20 split is an example, not a universal rule. Report the baseline and uncertainty alongside the chosen metric.",
            "សម្រាប់ទិន្នន័យតិច ប្រើការផ្ទៀងផ្ទាត់ឆ្លងនៅក្នុងក្រុមបង្វឹក។ ទិន្នន័យតាមពេលវេលាត្រូវផ្ទៀងផ្ទាត់តាមលំដាប់ពេល។ ការបែងចែក៦០/២០/២០គ្រាន់តែជាឧទាហរណ៍ មិនមែនច្បាប់សកលទេ។ រាយការណ៍លទ្ធផលគោល និងភាពមិនប្រាកដជាមួយរង្វាស់។",
          ),
        ],
        diagram: "pipeline",
        code: {
          language: "Python",
          source: `from sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import f1_score\n\nX, y = load_breast_cancer(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y)\nX_fit, X_val, y_fit, y_val = train_test_split(\n    X_train, y_train, test_size=0.25, random_state=42,\n    stratify=y_train)\nmodel = make_pipeline(StandardScaler(),\n                      LogisticRegression(max_iter=1000))\nmodel.fit(X_fit, y_fit)\nprint("Validation F1:", f1_score(y_val, model.predict(X_val)))\n# Choose settings using validation only, then refit.\nmodel.fit(X_train, y_train)\nprint("Final test F1:", f1_score(y_test, model.predict(X_test)))\n# Educational dataset example, not a clinical tool.`,
        },
        question: q(
          b(
            "Where should the scaler be fitted?",
            "តើគួរកំណត់មាត្រដ្ឋានពីទិន្នន័យណា?",
          ),
          b("Training data only", "ពីទិន្នន័យបង្វឹកតែប៉ុណ្ណោះ"),
          b("All data before splitting", "ពីទិន្នន័យទាំងអស់មុនបែងចែក"),
          b(
            "Using test information to fit preprocessing leaks information and inflates evaluation.",
            "ការប្រើព័ត៌មានតេស្តក្នុងការរៀបចំទិន្នន័យនាំឱ្យលេចធ្លាយព័ត៌មាន និងលទ្ធផលវាយតម្លៃល្អហួសពិត។",
          ),
        ),
      },
      {
        id: "algorithms",
        title: b("05 · Choose an algorithm", "០៥ · ជ្រើសរើសក្បួនដោះស្រាយ"),
        paragraphs: [
          b(
            "Start with a simple baseline, then compare models on the same valid split. More complexity is useful only when it improves the task under your memory, latency and explanation constraints.",
            "ចាប់ផ្ដើមពីម៉ូដែលគោលសាមញ្ញ ហើយប្រៀបធៀបលើការបែងចែកត្រឹមត្រូវដូចគ្នា។ ភាពស្មុគស្មាញមានប្រយោជន៍ បើវាធ្វើឱ្យលទ្ធផលប្រសើរ ក្នុងដែនកំណត់អង្គចងចាំ ល្បឿន និងការពន្យល់។",
          ),
        ],
        bullets: [
          b(
            "Linear regression predicts a continuous value from a weighted sum of features. Logistic regression maps a weighted sum through a sigmoid for binary probabilities; its name does not make it a regression output task.",
            "Linear regression ទស្សន៍ទាយតម្លៃបន្តពីផលបូកលក្ខណៈដែលមានទម្ងន់។ Logistic regression បម្លែងផលបូកតាម sigmoid សម្រាប់ប្រូបាបចំណាត់ថ្នាក់ពីរ។ ឈ្មោះវាមិនមានន័យថាលទ្ធផលជាតម្លៃបន្តទេ។",
          ),
          b(
            "Decision trees split features using rules; deep trees can memorize. Random forests average many randomized, bootstrapped trees to reduce variance, at a larger storage cost.",
            "Decision trees បែងចែកលក្ខណៈតាមច្បាប់ ហើយដើមឈើជ្រៅអាចចងចាំទិន្នន័យ។ Random forests រួមលទ្ធផលដើមឈើចៃដន្យច្រើន ដើម្បីបន្ថយភាពប្រែប្រួល ប៉ុន្តែប្រើទំហំផ្ទុកច្រើន។",
          ),
          b(
            "Support Vector Machines seek a separating margin. Kernels allow nonlinear boundaries; scaling matters and kernel methods can become expensive on large datasets.",
            "Support Vector Machines ស្វែងរកចន្លោះបំបែកថ្នាក់។ Kernels អនុញ្ញាតព្រំដែនមិនមែនបន្ទាត់។ ការកំណត់មាត្រដ្ឋានសំខាន់ ហើយទិន្នន័យធំអាចត្រូវការធនធានច្រើន។",
          ),
          b(
            "A Multi-Layer Perceptron (MLP) composes learned affine maps and nonlinear activations. It needs suitable optimization and regularization; stacking only linear layers still represents a linear map.",
            "Multi-Layer Perceptron (MLP) រួមការបម្លែងមានទម្ងន់ និងអនុគមន៍សកម្មមិនមែនបន្ទាត់។ វាត្រូវការការបង្វឹក និងការកម្រិតទម្ងន់សមស្រប។ ការដាក់ស្រទាប់បន្ទាត់សុទ្ធច្រើន នៅតែជាការបម្លែងបន្ទាត់។",
          ),
        ],
        formulas: [
          "\\hat y = w^T x+b",
          "p(y=1\\mid x)=\\sigma(w^Tx+b),\\quad \\sigma(z)=\\frac{1}{1+e^{-z}}",
        ],
        question: q(
          b(
            "Why add nonlinear activations to an MLP?",
            "ហេតុអ្វីបន្ថែមអនុគមន៍មិនមែនបន្ទាត់ទៅ MLP?",
          ),
          b(
            "To represent nonlinear relationships",
            "ដើម្បីតំណាងទំនាក់ទំនងមិនមែនបន្ទាត់",
          ),
          b(
            "To guarantee perfect generalization",
            "ដើម្បីធានាលទ្ធផលល្អលើទិន្នន័យថ្មីជានិច្ច",
          ),
          b(
            "Nonlinearities expand expressiveness; they do not guarantee generalization.",
            "អនុគមន៍មិនមែនបន្ទាត់បន្ថែមសមត្ថភាពតំណាង ប៉ុន្តែមិនធានាភាពទូទៅទេ។",
          ),
        ),
      },
      {
        id: "metrics",
        title: b("06 · Measure what matters", "០៦ · វាស់អ្វីដែលសំខាន់"),
        paragraphs: [
          b(
            "Accuracy is the fraction correct. Precision asks how many positive predictions are truly positive; recall asks how many actual positives are found. F1 is their harmonic mean. Class imbalance can make high accuracy misleading.",
            "Accuracy ជាចំណែកទស្សន៍ទាយត្រឹមត្រូវ។ Precision សួរថាក្នុងការទស្សន៍ទាយវិជ្ជមាន មានប៉ុន្មានដែលវិជ្ជមានពិត។ Recall សួរថារកឃើញវិជ្ជមានពិតប៉ុន្មាន។ F1 ជាមធ្យមអាម៉ូនិកនៃរង្វាស់ទាំងពីរ។ ថ្នាក់មិនសមតុល្យអាចធ្វើឱ្យ Accuracy ខ្ពស់បំភាន់។",
          ),
          b(
            "MSE measures squared numerical prediction error and penalizes large errors strongly. ROC-AUC measures how well scores rank positives above negatives across thresholds; it does not measure calibration or accuracy at one threshold. Use precision-recall analysis when positives are rare.",
            "MSE វាស់កំហុសទស្សន៍ទាយលេខជាការ៉េ និងដាក់ទោសកំហុសធំខ្លាំង។ ROC-AUC វាស់ការរៀបវិជ្ជមានខ្ពស់ជាងអវិជ្ជមានតាមពិន្ទុ នៅគ្រប់កម្រិតកាត់។ វាមិនវាស់ការកំណត់ប្រូបាប ឬ Accuracy នៅកម្រិតមួយទេ។ ពេលវិជ្ជមានកម្រ គួរពិនិត្យ Precision និង Recall។",
          ),
          b(
            "Move the threshold in this eight-example toy dataset. Higher thresholds usually trade recall for precision, though precision need not increase monotonically. Undefined precision or recall is displayed as 0 here; real reporting should state the convention.",
            "ផ្លាស់កម្រិតកាត់ក្នុងទិន្នន័យសិប្បនិម្មិតប្រាំបីឧទាហរណ៍។ កម្រិតខ្ពស់ជាទូទៅប្ដូរ Recall ទៅ Precision ប៉ុន្តែ Precision មិនចាំបាច់កើនជានិច្ចទេ។ នៅទីនេះ រង្វាស់ដែលមិនអាចគណនាបង្ហាញជា០។ ក្នុងរបាយការណ៍ពិត ត្រូវប្រាប់របៀបដោះស្រាយនេះ។",
          ),
        ],
        formulas: [
          "P=\\frac{TP}{TP+FP},\\quad R=\\frac{TP}{TP+FN},\\quad F_1=\\frac{2PR}{P+R}",
          "\\mathrm{MSE}=\\frac{1}{N}\\sum_i(\\hat y_i-y_i)^2",
        ],
        lab: "metrics",
        code: {
          language: "TypeScript",
          source: `const precision = tp + fp ? tp / (tp + fp) : 0;\nconst recall = tp + fn ? tp / (tp + fn) : 0;\nconst f1 = precision + recall\n  ? 2 * precision * recall / (precision + recall) : 0;`,
        },
        question: q(
          b(
            "Lowering the threshold can find more positives but also…",
            "ការបន្ថយកម្រិតកាត់អាចរកវិជ្ជមានច្រើន ប៉ុន្តែអាច…",
          ),
          b("Increase false positives", "បង្កើនវិជ្ជមានមិនពិត"),
          b("Guarantee a better model", "ធានាថាម៉ូដែលល្អជាងមុន"),
          b(
            "A threshold changes the decision policy, not the learned scores.",
            "កម្រិតកាត់ផ្លាស់ប្ដូរច្បាប់សម្រេច មិនមែនពិន្ទុដែលម៉ូដែលរៀនបានទេ។",
          ),
        ),
      },
      {
        id: "generalisation",
        title: b(
          "07 · Fit without memorizing",
          "០៧ · ផ្គូផ្គងដោយមិនចងចាំតែឧទាហរណ៍",
        ),
        paragraphs: [
          b(
            "Underfitting misses structure: both training and validation errors stay high. Overfitting adapts too closely to training noise: training error drops while validation error is worse. Use learning curves and validation, not training loss alone.",
            "Underfitting មិនចាប់លំនាំគ្រប់គ្រាន់ ដូច្នេះកំហុសបង្វឹក និងផ្ទៀងផ្ទាត់នៅខ្ពស់។ Overfitting ផ្គូផ្គងសំឡេងរំខានក្នុងទិន្នន័យបង្វឹកខ្លាំងពេក៖ កំហុសបង្វឹកទាប ប៉ុន្តែកំហុសផ្ទៀងផ្ទាត់ខ្ពស់។ ប្រើខ្សែកោងរៀន និងការផ្ទៀងផ្ទាត់ មិនមើលតែ Loss បង្វឹកទេ។",
          ),
          b(
            "In squared-error prediction, expected error decomposes into squared bias, variance and irreducible noise under standard assumptions. Complexity often reduces bias and raises variance, but modern overparameterized models do not always follow a simple U-shaped curve.",
            "ក្រោមលក្ខខណ្ឌស្តង់ដារ កំហុសរំពឹងទុកជាការ៉េអាចបែងជា Bias ការ៉េ Variance និងសំឡេងរំខានដែលមិនអាចលុប។ ភាពស្មុគស្មាញជាញឹកញាប់បន្ថយ Bias ហើយបង្កើន Variance ប៉ុន្តែម៉ូដែលសម័យថ្មីមិនតែងដើរតាមខ្សែកោងរាង U សាមញ្ញទេ។",
          ),
          b(
            "L1 (Lasso) can produce sparse coefficients; L2 (Ridge) shrinks coefficients smoothly. Tune λ on validation data and scale features when needed. Early stopping, suitable augmentation and more representative data can help too.",
            "L1 (Lasso) អាចធ្វើឱ្យមេគុណខ្លះស្មើសូន្យ។ L2 (Ridge) បង្រួមមេគុណដោយរលូន។ ជ្រើស λ លើទិន្នន័យផ្ទៀងផ្ទាត់ និងកំណត់មាត្រដ្ឋានលក្ខណៈបើចាំបាច់។ ការបញ្ឈប់មុន ការបន្ថែមទិន្នន័យសមស្រប និងទិន្នន័យតំណាងច្រើនក៏អាចជួយ។",
          ),
        ],
        formulas: [
          "\\Omega_{L_1}(w)=\\sum_j|w_j|,\\quad \\Omega_{L_2}(w)=\\sum_jw_j^2",
        ],
        question: q(
          b(
            "Which set selects regularization strength?",
            "តើសំណុំទិន្នន័យណាជ្រើសកម្លាំង Regularization?",
          ),
          b("Validation set", "សំណុំផ្ទៀងផ្ទាត់"),
          b(
            "Repeated checks on the test set",
            "ពិនិត្យសំណុំតេស្តម្តងហើយម្តងទៀត",
          ),
          b(
            "Keep the test set untouched until choices are fixed.",
            "ទុកសំណុំតេស្តដាច់ដោយឡែករហូតដល់បានកំណត់ជម្រើស។",
          ),
        ),
      },
    ],
  },
  {
    id: "graduate",
    title: b("Graduate", "កម្រិតឧត្ដម"),
    subtitle: b(
      "Risk, gradients, and representations",
      "ហានិភ័យ ជម្រាល និងការតំណាង",
    ),
    prerequisite: b(
      "Calculus, probability, linear algebra and the applied tier.",
      "យល់ពីកាល់គុល ប្រូបាប ពិជគណិតលីនេអ៊ែរ និងកម្រិតអនុវត្ត។",
    ),
    lessons: [
      {
        id: "risk",
        title: b(
          "08 · Statistical learning theory",
          "០៨ · ទ្រឹស្ដីការរៀនស្ថិតិ",
        ),
        paragraphs: [
          b(
            "Empirical Risk Minimization replaces unknown population risk with average observed loss, often plus a regularizer. θ are model parameters, fθ predicts, N is sample count, L measures error, and λ controls penalty Ω. Minimizing this objective does not alone establish low population risk.",
            "Empirical Risk Minimization ជំនួសហានិភ័យប្រជាជនដែលមិនដឹង ដោយ Loss មធ្យមលើទិន្នន័យដែលមាន ជាញឹកញាប់បន្ថែម Regularizer។ θ ជាប៉ារ៉ាម៉ែត្រ fθ ទស្សន៍ទាយ N ជាចំនួនគំរូ L វាស់កំហុស ហើយ λ គ្រប់គ្រងទោស Ω។ ការបន្ថយគោលដៅនេះតែមួយ មិនបញ្ជាក់ហានិភ័យទាបលើទិន្នន័យថ្មីទេ។",
          ),
          b(
            "MLE maximizes the likelihood of observed data. MAP maximizes likelihood times a prior, or minimizes negative log-likelihood plus negative log-prior. A Gaussian prior on weights corresponds to an L2 penalty; a Laplace prior corresponds to L1, with suitable scale constants.",
            "MLE បង្កើន Likelihood នៃទិន្នន័យដែលឃើញ។ MAP បង្កើន Likelihood គុណ Prior ឬបន្ថយ Negative log-likelihood បូក Negative log-prior។ Gaussian prior លើទម្ងន់សមមូលនឹងទោស L2 ហើយ Laplace prior សមមូលនឹង L1 ដោយមានមេគុណមាត្រដ្ឋានសមស្រប។",
          ),
          b(
            "PAC means probably approximately correct: a learner reaches small error with high probability under stated sampling assumptions. VC dimension counts the largest set a binary hypothesis class can shatter in all labelings; it is not simply the number of parameters.",
            "PAC មានន័យថាប្រហែលត្រឹមត្រូវដោយប្រូបាបខ្ពស់៖ អ្នករៀនទទួលកំហុសតិចដោយប្រូបាបខ្ពស់ ក្រោមលក្ខខណ្ឌយកគំរូដែលបានបញ្ជាក់។ VC dimension ជាទំហំសំណុំធំបំផុតដែលក្រុមច្បាប់ពីរថ្នាក់អាចបែងគ្រប់ស្លាកបាន មិនមែនគ្រាន់តែចំនួនប៉ារ៉ាម៉ែត្រទេ។",
          ),
          b(
            "For a finite hypothesis class H, iid examples and loss bounded in [0,1], Hoeffding’s inequality plus a union bound gives the uniform deviation bound below with probability at least 1−δ. Infinite classes need other capacity measures (such as VC dimension or Rademacher complexity); assumptions and constants matter.",
            "សម្រាប់ក្រុមច្បាប់កំណត់ H គំរូឯករាជ្យពីបំណែងចែកដូចគ្នា និង Loss ក្នុង[០,១] អសមីការ Hoeffding ជាមួយ Union bound ផ្ដល់ដែនកំណត់ខាងក្រោម ដោយប្រូបាបយ៉ាងហោចណាស់១−δ។ ក្រុមអនន្តត្រូវការរង្វាស់សមត្ថភាពផ្សេង ដូចជា VC dimension ឬ Rademacher complexity។ លក្ខខណ្ឌ និងថេរសំខាន់។",
          ),
        ],
        formulas: [
          "\\hat\\theta=\\arg\\min_\\theta\\left[\\frac1N\\sum_{i=1}^N\\mathcal L(f_\\theta(x_i),y_i)+\\lambda\\Omega(\\theta)\\right]",
          "\\theta_{\\mathrm{MAP}}=\\arg\\max_\\theta p(D\\mid\\theta)p(\\theta)",
          "\\sup_{h\\in H}|R(h)-\\hat R(h)|\\leq\\sqrt{\\frac{\\ln(2|H|/\\delta)}{2N}}",
        ],
        question: q(
          b(
            "Can a generalization bound ignore sampling assumptions?",
            "តើដែនកំណត់ភាពទូទៅអាចមិនគិតលក្ខខណ្ឌយកគំរូទេ?",
          ),
          b(
            "No; assumptions are part of the guarantee",
            "ទេ លក្ខខណ្ឌជាផ្នែកនៃការធានា",
          ),
          b(
            "Yes; every trained model is covered",
            "បាទ ម៉ូដែលបង្វឹកគ្រប់គ្នាត្រូវបានធានា",
          ),
          b(
            "Distribution shift can invalidate an iid-based guarantee.",
            "ការផ្លាស់ប្ដូរបំណែងចែកអាចធ្វើឱ្យការធានាផ្អែកលើ iid មិនអាចប្រើបាន។",
          ),
        ),
      },
      {
        id: "gradients",
        title: b(
          "09 · Backpropagation and optimization",
          "០៩ · Backpropagation និងការបង្កើនប្រសិទ្ធភាព",
        ),
        paragraphs: [
          b(
            "For a one-hidden-unit network, let z=w₁x+b₁, a=ReLU(z), ŷ=w₂a+b₂ and L=(ŷ−y)²/2. The chain rule gives ∂L/∂w₂=(ŷ−y)a and ∂L/∂w₁=(ŷ−y)w₂·1[z>0]x. The ReLU derivative at zero requires a convention (commonly 0).",
            "សម្រាប់បណ្ដាញមានណឺរ៉ូនលាក់មួយ កំណត់ z=w₁x+b₁, a=ReLU(z), ŷ=w₂a+b₂ និង L=(ŷ−y)²/2។ ច្បាប់ខ្សែផ្ដល់ ∂L/∂w₂=(ŷ−y)a និង ∂L/∂w₁=(ŷ−y)w₂·1[z>0]x។ ដេរីវេ ReLU នៅសូន្យត្រូវកំណត់ជាមុន ជាទូទៅ០។",
          ),
          b(
            "For vectors, backpropagation applies vector–Jacobian products from the scalar loss backward through each layer, summing contributions along every path. Autograd builds this computation graph; it does not eliminate the need to understand loss scaling and graph lifetime.",
            "សម្រាប់វ៉ិចទ័រ Backpropagation ប្រើផលគុណ vector–Jacobian ពី Loss ស្កាលាត្រឡប់តាមស្រទាប់ ហើយបូកគ្រប់ផ្លូវ។ Autograd បង្កើតក្រាហ្វគណនានេះ ប៉ុន្តែមិនជំនួសការយល់ពីមាត្រដ្ឋាន Loss និងអាយុកាលក្រាហ្វទេ។",
          ),
          b(
            "SGD uses minibatch gradients. Momentum accumulates a velocity; RMSprop rescales using an exponential average of squared gradients; Adam combines first and second moments with bias correction. The lab isolates optimizer behavior on a deterministic one-dimensional quadratic, not a noisy neural-network landscape.",
            "SGD ប្រើជម្រាលពីក្រុមគំរូតូច។ Momentum សន្សំល្បឿន RMSprop កែទំហំដោយមធ្យមជម្រាលការ៉េ ហើយ Adam រួម moments ទី១ និងទី២ជាមួយការកែ Bias។ លំហាត់នេះបង្ហាញអាកប្បកិរិយាលើអនុគមន៍ការ៉េមួយវិមាត្រ មិនមែនផ្ទៃ Loss នៃបណ្ដាញពិតដែលមានសំឡេងរំខានទេ។",
          ),
          b(
            "Loss surfaces can include flat directions, saddles and sharp curvature. A large learning rate may oscillate or diverge; adaptive methods do not guarantee the global minimum or better generalization.",
            "ផ្ទៃ Loss អាចមានទិសស្មើ ចំណុចកែប និងកោងខ្លាំង។ Learning rate ធំពេកអាចរំញ័រ ឬចេញឆ្ងាយ។ វិធីកែសម្រួលដោយស្វ័យប្រវត្តិមិនធានាចំណុចអប្បបរមាសកល ឬភាពទូទៅប្រសើរទេ។",
          ),
        ],
        formulas: [
          "\\nabla_x L=J_f(x)^T\\nabla_{f(x)}L",
          "\\theta_{t+1}=\\theta_t-\\eta_t\\nabla_\\theta\\mathcal L_{B_t}",
        ],
        lab: "optimisation",
        code: {
          language: "PyTorch",
          source: `import torch\nx = torch.tensor(2.0)\ny = torch.tensor(5.0)\nw1 = torch.tensor(1.0, requires_grad=True)\nw2 = torch.tensor(2.0, requires_grad=True)\ny_hat = w2 * torch.relu(w1 * x)\nloss = 0.5 * (y_hat - y)**2\nloss.backward()\nprint(w1.grad.item(), w2.grad.item())  # -4.0, -2.0\n# Before the next independent backward pass, clear grads.\nw1.grad = None\nw2.grad = None`,
        },
        question: q(
          b(
            "What does backpropagation compute?",
            "តើ Backpropagation គណនាអ្វី?",
          ),
          b("Gradients via the chain rule", "ជម្រាលតាមច្បាប់ខ្សែ"),
          b("A guaranteed globally optimal model", "ម៉ូដែលល្អបំផុតសកលដែលធានា"),
          b(
            "An optimizer uses the gradients to update parameters; gradient computation is a separate step.",
            "Optimizer ប្រើជម្រាលដើម្បីកែប៉ារ៉ាម៉ែត្រ។ ការគណនាជម្រាលជាជំហានផ្សេង។",
          ),
        ),
      },
      {
        id: "architectures",
        title: b(
          "10 · CNNs and self-attention",
          "១០ · CNNs និង Self-attention",
        ),
        paragraphs: [
          b(
            "CNNs use shared local kernels to detect spatial patterns. An ideal convolution is translation equivariant: shifting input shifts its feature map. Pooling or global aggregation can encourage approximate invariance, but boundaries, strides and padding complicate it.",
            "CNNs ប្រើ Kernels មូលដ្ឋានដែលចែករំលែក ដើម្បីរកលំនាំទីតាំង។ Convolution ឧត្ដមមាន Translation equivariance៖ ផ្លាស់រូបចូល នោះផែនទីលក្ខណៈក៏ផ្លាស់។ Pooling ឬការរួមសកលអាចលើកទឹកចិត្តភាពមិនប្រែប្រួលប្រហែល ប៉ុន្តែព្រំដែន Strides និង Padding ធ្វើឱ្យស្មុគស្មាញ។",
          ),
          b(
            "Self-attention projects token representations into queries Q, keys K and values V. Dot products score relevance, division by √dₖ controls score scale, softmax normalizes each row, and the weights mix value vectors. Q, K and V originate from the same sequence in self-attention.",
            "Self-attention បម្លែងតំណាង Tokens ទៅ Queries Q, Keys K និង Values V។ ផលគុណចំណុចវាស់ភាពពាក់ព័ន្ធ ការចែកនឹង √dₖ គ្រប់គ្រងមាត្រដ្ឋាន Softmax ធ្វើឱ្យជួរដេកនីមួយៗសរុប១ ហើយទម្ងន់រួមវ៉ិចទ័រ Values។ ក្នុង Self-attention Q, K និង V មកពីលំដាប់ដូចគ្នា។",
          ),
          b(
            "Positions must be represented separately (for example positional encodings); decoder causal masks prevent access to future tokens. Multi-head attention learns several projections. A Transformer block also contains residual connections, normalization and a feed-forward network. Attention weights alone are not a causal explanation.",
            "ទីតាំងត្រូវតំណាងដាច់ដោយឡែក ដូចជា Positional encodings។ Causal masks ក្នុង Decoder រារាំង Tokens អនាគត។ Multi-head attention រៀនការបម្លែងច្រើន។ Transformer block ក៏មាន Residual connections Normalization និង Feed-forward network។ ទម្ងន់ Attention តែឯងមិនមែនការពន្យល់ហេតុផលទេ។",
          ),
        ],
        formulas: [
          "\\mathrm{Attention}(Q,K,V)=\\mathrm{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V",
        ],
        diagram: "attention",
        lab: "attention",
        code: {
          language: "PyTorch",
          source: `import math\nimport torch\n# Single head: [batch, tokens, head dimension]\nq = torch.tensor([[[1., 0.], [0., 1.], [1., 1.]]])\nk, v = q.clone(), q.clone()\nscores = q @ k.transpose(-2, -1) / math.sqrt(q.size(-1))\n# Optional decoder mask; future positions become -infinity.\nmask = torch.ones(3, 3, dtype=torch.bool).tril()\nscores = scores.masked_fill(~mask, float('-inf'))\nweights = scores.softmax(dim=-1)\noutput = weights @ v\nprint(output)\n# Toy head, not a complete Transformer.`,
        },
        question: q(
          b(
            "Why use a causal mask in a decoder?",
            "ហេតុអ្វីប្រើ Causal mask ក្នុង Decoder?",
          ),
          b(
            "To prevent looking at future tokens",
            "ដើម្បីរារាំងការមើល Tokens អនាគត",
          ),
          b("To remove all past context", "ដើម្បីលុបបរិបទពីមុនទាំងអស់"),
          b(
            "Each position can attend to itself and earlier positions, not later ones.",
            "ទីតាំងនីមួយៗអាចមើលខ្លួនឯង និងទីតាំងមុន មិនមែនទីតាំងក្រោយ។",
          ),
        ),
      },
    ],
  },
  {
    id: "expert",
    title: b("Expert", "កម្រិតជំនាញ"),
    subtitle: b(
      "Scale and operate learning systems",
      "ពង្រីក និងដំណើរការប្រព័ន្ធរៀន",
    ),
    prerequisite: b(
      "Graduate concepts and familiarity with GPU training and systems.",
      "យល់គំនិតកម្រិតឧត្ដម និងស្គាល់ការបង្វឹកលើ GPU និងប្រព័ន្ធ។",
    ),
    lessons: [
      {
        id: "parallelism",
        title: b("11 · Distributed scale", "១១ · ការពង្រីកចែកចាយ"),
        paragraphs: [
          b(
            "DDP replicates a complete model on each device, gives each rank different samples and synchronizes gradients (normally all-reduce). Use DistributedSampler, call set_epoch for reshuffling, and ensure collective operations occur in a consistent order.",
            "DDP ចម្លងម៉ូដែលពេញលើឧបករណ៍នីមួយៗ ផ្ដល់គំរូផ្សេងទៅ Rank ហើយធ្វើសមកាលកម្មជម្រាល ជាទូទៅដោយ All-reduce។ ប្រើ DistributedSampler ហៅ set_epoch ដើម្បីតម្រៀបឡើងវិញ និងធានាលំដាប់ប្រតិបត្តិការរួមស្របគ្នា។",
          ),
          b(
            "Tensor parallelism shards individual matrix operations across devices and communicates intermediate results. Pipeline parallelism assigns consecutive layers to stages and schedules microbatches, introducing pipeline bubbles. Neither is simply DDP with a smaller batch.",
            "Tensor parallelism បែងប្រតិបត្តិការម៉ាទ្រីសទៅឧបករណ៍ច្រើន ហើយទាក់ទងលទ្ធផលមធ្យម។ Pipeline parallelism បែងស្រទាប់ជាប់គ្នាទៅដំណាក់កាល ហើយកំណត់ពេល Microbatches ដែលបង្កចន្លោះទំនេរ។ ទាំងពីរមិនមែនគ្រាន់តែ DDP ជាមួយ Batch តូចទេ។",
          ),
          b(
            "FSDP shards parameters, gradients and optimizer states, trading memory for communication. Hybrid parallelism combines strategies. Network topology, bandwidth, batch shape and recomputation decide throughput; more GPUs do not imply linear speedup.",
            "FSDP បែងប៉ារ៉ាម៉ែត្រ ជម្រាល និងស្ថានភាព Optimizer ដោយប្ដូរអង្គចងចាំទៅការទាក់ទង។ Hybrid parallelism រួមយុទ្ធសាស្ត្រ។ រចនាសម្ព័ន្ធបណ្ដាញ Bandwidth រូបរាង Batch និងការគណនាឡើងវិញកំណត់ល្បឿន។ GPU ច្រើនមិនធានាកើនល្បឿនតាមសមាមាត្រទេ។",
          ),
        ],
        diagram: "parallel",
        lab: "parallel",
        code: {
          language: "PyTorch",
          source: `# train.py — run: torchrun --standalone --nproc_per_node=2 train.py\nimport os\nimport torch\nimport torch.distributed as dist\nfrom torch.nn.parallel import DistributedDataParallel as DDP\n\nlocal_rank = int(os.environ['LOCAL_RANK'])\ntorch.cuda.set_device(local_rank)\ndist.init_process_group('nccl')\ntry:\n    net = DDP(torch.nn.Linear(8, 1).cuda(local_rank),\n              device_ids=[local_rank])\n    opt = torch.optim.SGD(net.parameters(), lr=0.01)\n    torch.manual_seed(42 + dist.get_rank())\n    x = torch.randn(16, 8, device=f'cuda:{local_rank}')\n    y = torch.randn(16, 1, device=f'cuda:{local_rank}')\n    opt.zero_grad(set_to_none=True)\n    loss = torch.nn.functional.mse_loss(net(x), y)\n    loss.backward()  # synchronized gradients\n    opt.step()\nfinally:\n    dist.destroy_process_group()\n# Requires two CUDA GPUs and a compatible PyTorch installation.\n# Real data: use a DistributedSampler, not identical shards.`,
        },
        question: q(
          b(
            "Does DDP divide a model’s parameters across devices?",
            "តើ DDP បែងប៉ារ៉ាម៉ែត្រម៉ូដែលទៅឧបករណ៍មែនទេ?",
          ),
          b(
            "No; each rank holds a full replica",
            "ទេ Rank នីមួយៗមានច្បាប់ចម្លងពេញ",
          ),
          b(
            "Yes; each rank holds only one layer",
            "បាទ Rank នីមួយៗមានតែស្រទាប់មួយ",
          ),
          b(
            "Tensor, pipeline or fully sharded approaches address model memory differently.",
            "Tensor Pipeline ឬការបែងពេញ ដោះស្រាយអង្គចងចាំម៉ូដែលតាមរបៀបផ្សេង។",
          ),
        ),
      },
      {
        id: "efficiency",
        title: b(
          "12 · Memory, attention and efficiency",
          "១២ · អង្គចងចាំ Attention និងប្រសិទ្ធភាព",
        ),
        paragraphs: [
          b(
            "Mixed precision uses lower-precision operations with numerically sensitive work in higher precision; FP16 may need gradient scaling, while BF16 has a wider exponent range. Activation checkpointing saves memory by recomputing activations during backward. Measure the resulting speed and stability.",
            "Mixed precision ប្រើប្រតិបត្តិការភាពច្បាស់ទាប ហើយគណនាដែលងាយខុសដោយភាពច្បាស់ខ្ពស់។ FP16 អាចត្រូវការ Gradient scaling ខណៈ BF16 មានជួរ Exponent ទូលាយ។ Activation checkpointing សន្សំអង្គចងចាំដោយគណនា Activations ឡើងវិញពេល Backward។ ត្រូវវាស់ល្បឿន និងស្ថិរភាព។",
          ),
          b(
            "Standard dense attention has quadratic token-pair work. IO-aware exact attention such as FlashAttention reduces high-bandwidth-memory traffic without claiming that every quadratic computation disappears. Sparse and linear attention change assumptions or connectivity and need separate quality evaluation.",
            "Dense attention ស្តង់ដារមានការងារគូ Tokens ការ៉េតាមប្រវែង។ Exact attention ដែលយកចិត្តទុកដាក់ IO ដូចជា FlashAttention បន្ថយចរាចរអង្គចងចាំ ដោយមិនអះអាងថាការគណនាការ៉េទាំងអស់បាត់ទេ។ Sparse និង Linear attention ផ្លាស់លក្ខខណ្ឌ ឬការតភ្ជាប់ និងត្រូវវាយតម្លៃគុណភាពផ្សេង។",
          ),
          b(
            "Mixture-of-Experts activates selected experts per token, but routing imbalance and all-to-all communication can dominate. Quantization reduces storage/compute precision; evaluate quality on Khmer text as well as aggregate benchmarks.",
            "Mixture-of-Experts បើក Experts ជ្រើសរើសសម្រាប់ Token ប៉ុន្តែ Routing មិនសមតុល្យ និងការទាក់ទង All-to-all អាចក្លាយជាឧបសគ្គ។ Quantization បន្ថយភាពច្បាស់ផ្ទុក និងគណនា។ វាយតម្លៃគុណភាពលើអត្ថបទខ្មែរ ជាមួយរង្វាស់ទូទៅ។",
          ),
        ],
        question: q(
          b(
            "What does activation checkpointing trade for memory?",
            "តើ Activation checkpointing ប្ដូរអ្វីដើម្បីសន្សំអង្គចងចាំ?",
          ),
          b("Additional recomputation", "ការគណនាឡើងវិញបន្ថែម"),
          b("A guaranteed accuracy improvement", "ការកើនភាពត្រឹមត្រូវដែលធានា"),
          b(
            "Recomputing intermediate activations reduces stored tensors at a compute cost.",
            "ការគណនា Activations មធ្យមឡើងវិញបន្ថយ Tensors ផ្ទុក ប៉ុន្តែប្រើការគណនាបន្ថែម។",
          ),
        ),
      },
      {
        id: "operations",
        title: b(
          "13 · Deploy, evaluate, recover",
          "១៣ · ដាក់ប្រើ វាយតម្លៃ និងស្ដារឡើងវិញ",
        ),
        paragraphs: [
          b(
            "A production model needs versioned data, code and weights, held-out evaluations, subgroup checks, latency/memory measurements and a rollback plan. Persist optimizer, scheduler, random-number and data-loader state for resumable training, not just weights.",
            "ម៉ូដែលប្រើពិតត្រូវការកំណែទិន្នន័យ កូដ និងទម្ងន់ ការវាយតម្លៃទិន្នន័យដាច់ ការពិនិត្យក្រុមរង រង្វាស់ល្បឿន និងអង្គចងចាំ និងផែនការត្រឡប់កំណែ។ រក្សាទុកស្ថានភាព Optimizer Scheduler លេខចៃដន្យ និង Data loader ដើម្បីបន្តបង្វឹក មិនរក្សាតែទម្ងន់ទេ។",
          ),
          b(
            "Distinguish pretraining, fine-tuning and retrieval augmentation. Retrieval can supply context but cannot guarantee truth; keep document permissions intact. Monitor drift, abuse and uncertain outputs. Evaluate the whole system, including prompts, retrieval and tools, rather than the base model alone.",
            "បែងចែក Pretraining Fine-tuning និង Retrieval augmentation។ Retrieval អាចផ្ដល់បរិបទ ប៉ុន្តែមិនធានាការពិត។ រក្សាសិទ្ធិឯកសារឱ្យត្រឹមត្រូវ។ តាមដាន Drift ការប្រើខុស និងលទ្ធផលមិនប្រាកដ។ វាយតម្លៃប្រព័ន្ធទាំងមូល រួម Prompts Retrieval និងឧបករណ៍ មិនមើលតែម៉ូដែលគោលទេ។",
          ),
          b(
            "This browser module teaches systems concepts using small deterministic simulations. It does not launch distributed training, run Python, or access GPUs. Copy the snippets to a properly configured environment and review current framework documentation before production use.",
            "មេរៀនក្នុងកម្មវិធីរុករកនេះបង្រៀនគំនិតប្រព័ន្ធតាមការក្លែងធ្វើតូចៗ។ វាមិនចាប់ផ្ដើមការបង្វឹកចែកចាយ មិនដំណើរការ Python និងមិនប្រើ GPU ទេ។ ចម្លងកូដទៅបរិស្ថានដែលរៀបចំត្រឹមត្រូវ ហើយពិនិត្យឯកសារក្របខណ្ឌថ្មីមុនប្រើពិត។",
          ),
        ],
        question: q(
          b(
            "Is a weights file alone enough to resume training exactly?",
            "តើឯកសារទម្ងន់តែមួយគ្រប់គ្រាន់ដើម្បីបន្តបង្វឹកដូចដើមមែនទេ?",
          ),
          b(
            "No; save optimizer and other relevant state too",
            "ទេ ត្រូវរក្សា Optimizer និងស្ថានភាពពាក់ព័ន្ធផង",
          ),
          b("Yes; state never matters", "បាទ ស្ថានភាពមិនសំខាន់ទេ"),
          b(
            "Optimizer moments, schedules and randomness affect the next update.",
            "Optimizer moments កាលវិភាគ និងភាពចៃដន្យប៉ះពាល់ការកែបន្ទាប់។",
          ),
        ),
      },
    ],
  },
];
export const sources = [
  {
    label: "scikit-learn · Model evaluation",
    url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
  },
  {
    label: "scikit-learn · Cross-validation",
    url: "https://scikit-learn.org/stable/modules/cross_validation.html",
  },
  {
    label: "Dive into Deep Learning · Backpropagation",
    url: "https://d2l.ai/chapter_multilayer-perceptrons/backprop.html",
  },
  {
    label: "Dive into Deep Learning · Convolutions",
    url: "https://d2l.ai/chapter_convolutional-neural-networks/why-conv.html",
  },
  {
    label: "Vaswani et al. · Attention Is All You Need",
    url: "https://arxiv.org/abs/1706.03762",
  },
  {
    label: "PyTorch · Distributed overview",
    url: "https://docs.pytorch.org/tutorials/beginner/dist_overview.html",
  },
  {
    label: "PyTorch · Distributed Data Parallel",
    url: "https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html",
  },
  {
    label: "Shalev-Shwartz & Ben-David · Understanding Machine Learning",
    url: "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/",
  },
  {
    label: "Dao et al. · FlashAttention",
    url: "https://arxiv.org/abs/2205.14135",
  },
];
