import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

const contentBlocks = [
	// ── Computer Vision ─────────────────────────────────────────────────────────
	{
		domain: 'Computer Vision',
		type: 'Theory',
		payload: `## Convolutional Neural Networks (CNNs)

CNNs learn spatial hierarchies of features from images using three core layer types:

- **Convolutional layer** – applies learned filters (kernels) over the input to produce feature maps.
- **Pooling layer** – reduces spatial dimensions, making the network translation-invariant.
- **Fully-connected layer** – maps extracted features to output class probabilities.

Each convolutional filter acts as a feature detector (edges → textures → objects) as depth increases.`,
		difficulty_level: 2
	},
	{
		domain: 'Computer Vision',
		type: 'Python Code',
		payload: `# Simple CNN in PyTorch
import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes: int = 10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Linear(64 * 8 * 8, num_classes)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.features(x)
        x = x.flatten(1)
        return self.classifier(x)

model = SimpleCNN()
print(model)`,
		difficulty_level: 3
	},
	{
		domain: 'Computer Vision',
		type: 'Math',
		payload: `A 2-D convolution output size is:

  output_size = floor((input_size + 2 × padding − kernel_size) / stride) + 1

Given an input of 32×32, kernel 3×3, padding 1, stride 1 — what is the output spatial dimension?`,
		difficulty_level: 2
	},

	// ── Transformers ─────────────────────────────────────────────────────────────
	{
		domain: 'Transformers',
		type: 'Theory',
		payload: `## Self-Attention Mechanism

Self-attention allows every token to attend to every other token in a sequence. For each token it computes three vectors:

- **Query (Q)** – what the token is looking for.
- **Key (K)** – what the token offers to others.
- **Value (V)** – the information the token passes along.

Attention weights are computed as: softmax(QKᵀ / √d_k) × V

Multi-head attention runs this process H times in parallel and concatenates the results, capturing diverse relationships.`,
		difficulty_level: 3
	},
	{
		domain: 'Transformers',
		type: 'Python Code',
		payload: `# Scaled dot-product attention (NumPy)
import numpy as np

def scaled_dot_product_attention(Q, K, V):
    """
    Q, K, V: arrays of shape (seq_len, d_k)
    Returns: context vectors of shape (seq_len, d_k)
    """
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)          # (seq, seq)
    weights = np.exp(scores - scores.max(-1, keepdims=True))
    weights /= weights.sum(-1, keepdims=True)  # softmax
    return weights @ V

seq_len, d_k = 4, 8
Q = np.random.randn(seq_len, d_k)
K = np.random.randn(seq_len, d_k)
V = np.random.randn(seq_len, d_k)
print(scaled_dot_product_attention(Q, K, V).shape)  # (4, 8)`,
		difficulty_level: 3
	},
	{
		domain: 'Transformers',
		type: 'Math',
		payload: `The attention score between query q and key k is:

  score(q, k) = (q · k) / √d_k

Why do we divide by √d_k rather than d_k itself, and what problem does this solve?`,
		difficulty_level: 3
	},

	// ── Optimization ─────────────────────────────────────────────────────────────
	{
		domain: 'Optimization',
		type: 'Theory',
		payload: `## Gradient Descent Variants

Gradient descent minimizes a loss L(θ) by iteratively updating parameters in the negative gradient direction:

  θ ← θ − α ∇_θ L

**Variants:**
- **Batch GD** – uses the entire dataset per step; stable but slow.
- **SGD** – uses one sample; fast but noisy.
- **Mini-batch SGD** – balances speed and stability (most common in practice).
- **Adam** – adapts the learning rate per parameter using first and second moment estimates.`,
		difficulty_level: 1
	},
	{
		domain: 'Optimization',
		type: 'Python Code',
		payload: `# Mini-batch gradient descent from scratch
import numpy as np

def sgd_step(params, grads, lr=0.01):
    return {k: params[k] - lr * grads[k] for k in params}

# Toy quadratic loss: L = (w - 3)^2
w = np.array(0.0)
lr = 0.1
for step in range(20):
    grad = 2 * (w - 3)   # dL/dw
    w = w - lr * grad
    if step % 5 == 0:
        print(f"Step {step:2d}  w={w:.4f}  loss={(w-3)**2:.4f}")`,
		difficulty_level: 1
	},
	{
		domain: 'Optimization',
		type: 'Math',
		payload: `Adam maintains running estimates of the gradient moments:

  m_t = β₁ m_{t-1} + (1 − β₁) g_t
  v_t = β₂ v_{t-1} + (1 − β₂) g_t²

The bias-corrected update is: θ ← θ − α m̂_t / (√v̂_t + ε)

What is the purpose of the bias-correction terms m̂_t and v̂_t?`,
		difficulty_level: 2
	},

	// ── NLP ──────────────────────────────────────────────────────────────────────
	{
		domain: 'NLP',
		type: 'Theory',
		payload: `## Tokenization and Embeddings

Before a neural network can process text, it must convert words into numbers:

1. **Tokenization** – split text into subword units (BPE, WordPiece).
2. **Vocabulary lookup** – map each token to an integer ID.
3. **Embedding layer** – look up a dense vector (e.g., 768-dim) for each token ID.

Pre-trained embeddings (Word2Vec, GloVe, or transformer embeddings) encode semantic similarity: vectors for "king" and "queen" are geometrically close.`,
		difficulty_level: 1
	},
	{
		domain: 'NLP',
		type: 'Python Code',
		payload: `# Byte-Pair Encoding (BPE) – conceptual demo
from collections import Counter

corpus = ["low", "lower", "newest", "widest"]
vocab = Counter(c for word in corpus for c in word)

# In real BPE we iteratively merge the most frequent pair.
# Here we just show the initial character vocabulary:
print("Initial vocab:", dict(sorted(vocab.items(), key=lambda x: -x[1])))

# Using HuggingFace tokenizers in practice:
# from transformers import AutoTokenizer
# tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
# print(tokenizer.tokenize("gradient descent is fun"))`,
		difficulty_level: 2
	},
	{
		domain: 'NLP',
		type: 'Math',
		payload: `Word2Vec trains embeddings by maximising the probability of context words given a center word:

  P(w_context | w_center) = exp(v_c · v_w) / Σ_w' exp(v_c · v_w')

Why is computing this softmax over the full vocabulary expensive, and how does negative sampling address it?`,
		difficulty_level: 3
	}
];

async function main() {
	console.log('Seeding database with ML content blocks...');

	await prisma.contentBlock.deleteMany();

	for (const block of contentBlocks) {
		await prisma.contentBlock.create({ data: block });
	}

	console.log(`Seeded ${contentBlocks.length} content blocks.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
