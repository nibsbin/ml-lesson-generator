import type { ContentBlock, Lesson } from './types';

export type { ContentBlock, Lesson };

// ── Hardcoded ML content pool ──────────────────────────────────────────────

const CONTENT_BLOCKS: ContentBlock[] = [
	// Computer Vision
	{
		id: 'cv-theory-1',
		domain: 'Computer Vision',
		type: 'Theory',
		difficulty_level: 2,
		createdAt: new Date(),
		payload: `## Convolutional Neural Networks (CNNs)

CNNs learn spatial hierarchies of features from images using three core layer types:

- **Convolutional layer** – applies learned filters (kernels) over the input to produce feature maps.
- **Pooling layer** – reduces spatial dimensions, making the network translation-invariant.
- **Fully-connected layer** – maps extracted features to output class probabilities.

Each convolutional filter acts as a feature detector (edges → textures → objects) as depth increases.`
	},
	{
		id: 'cv-code-1',
		domain: 'Computer Vision',
		type: 'Python Code',
		difficulty_level: 3,
		createdAt: new Date(),
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
print(model)`
	},
	{
		id: 'cv-math-1',
		domain: 'Computer Vision',
		type: 'Math',
		difficulty_level: 2,
		createdAt: new Date(),
		payload: `A 2-D convolution output size is:

  output_size = floor((input_size + 2 × padding − kernel_size) / stride) + 1

Given an input of 32×32, kernel 3×3, padding 1, stride 1 — what is the output spatial dimension?`
	},

	// Transformers
	{
		id: 'tr-theory-1',
		domain: 'Transformers',
		type: 'Theory',
		difficulty_level: 3,
		createdAt: new Date(),
		payload: `## Self-Attention Mechanism

Self-attention allows every token to attend to every other token in a sequence. For each token it computes three vectors:

- **Query (Q)** – what the token is looking for.
- **Key (K)** – what the token offers to others.
- **Value (V)** – the information the token passes along.

Attention weights are computed as: softmax(QKᵀ / √d_k) × V

Multi-head attention runs this process H times in parallel and concatenates the results, capturing diverse relationships.`
	},
	{
		id: 'tr-code-1',
		domain: 'Transformers',
		type: 'Python Code',
		difficulty_level: 3,
		createdAt: new Date(),
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
print(scaled_dot_product_attention(Q, K, V).shape)  # (4, 8)`
	},
	{
		id: 'tr-math-1',
		domain: 'Transformers',
		type: 'Math',
		difficulty_level: 3,
		createdAt: new Date(),
		payload: `The attention score between query q and key k is:

  score(q, k) = (q · k) / √d_k

Why do we divide by √d_k rather than d_k itself, and what problem does this solve?`
	},

	// Optimization
	{
		id: 'opt-theory-1',
		domain: 'Optimization',
		type: 'Theory',
		difficulty_level: 1,
		createdAt: new Date(),
		payload: `## Gradient Descent Variants

Gradient descent minimizes a loss L(θ) by iteratively updating parameters in the negative gradient direction:

  θ ← θ − α ∇_θ L

**Variants:**
- **Batch GD** – uses the entire dataset per step; stable but slow.
- **SGD** – uses one sample; fast but noisy.
- **Mini-batch SGD** – balances speed and stability (most common in practice).
- **Adam** – adapts the learning rate per parameter using first and second moment estimates.`
	},
	{
		id: 'opt-code-1',
		domain: 'Optimization',
		type: 'Python Code',
		difficulty_level: 1,
		createdAt: new Date(),
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
        print(f"Step {step:2d}  w={w:.4f}  loss={(w-3)**2:.4f}")`
	},
	{
		id: 'opt-math-1',
		domain: 'Optimization',
		type: 'Math',
		difficulty_level: 2,
		createdAt: new Date(),
		payload: `Adam maintains running estimates of the gradient moments:

  m_t = β₁ m_{t-1} + (1 − β₁) g_t
  v_t = β₂ v_{t-1} + (1 − β₂) g_t²

The bias-corrected update is: θ ← θ − α m̂_t / (√v̂_t + ε)

What is the purpose of the bias-correction terms m̂_t and v̂_t?`
	},

	// NLP
	{
		id: 'nlp-theory-1',
		domain: 'NLP',
		type: 'Theory',
		difficulty_level: 1,
		createdAt: new Date(),
		payload: `## Tokenization and Embeddings

Before a neural network can process text, it must convert words into numbers:

1. **Tokenization** – split text into subword units (BPE, WordPiece).
2. **Vocabulary lookup** – map each token to an integer ID.
3. **Embedding layer** – look up a dense vector (e.g., 768-dim) for each token ID.

Pre-trained embeddings (Word2Vec, GloVe, or transformer embeddings) encode semantic similarity: vectors for "king" and "queen" are geometrically close.`
	},
	{
		id: 'nlp-code-1',
		domain: 'NLP',
		type: 'Python Code',
		difficulty_level: 2,
		createdAt: new Date(),
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
# print(tokenizer.tokenize("gradient descent is fun"))`
	},
	{
		id: 'nlp-math-1',
		domain: 'NLP',
		type: 'Math',
		difficulty_level: 3,
		createdAt: new Date(),
		payload: `Word2Vec trains embeddings by maximizing the probability of context words given a center word:

  P(w_context | w_center) = exp(v_c · v_w) / Σ_w' exp(v_c · v_w')

Why is computing this softmax over the full vocabulary expensive, and how does negative sampling address it?`
	}
];

// ── In-memory lesson store ─────────────────────────────────────────────────

const lessonStore = new Map<string, Lesson>();

// ── Fake database API (mirrors Prisma interface shape) ─────────────────────

export const db = {
	contentBlock: {
		findMany(): ContentBlock[] {
			return CONTENT_BLOCKS;
		}
	},
	lesson: {
		create(args: { data: { blocks: string } }): Lesson {
			const lesson: Lesson = {
				id: crypto.randomUUID(),
				blocks: args.data.blocks,
				createdAt: new Date()
			};
			lessonStore.set(lesson.id, lesson);
			return lesson;
		},
		findUnique(args: { where: { id: string } }): Lesson | null {
			return lessonStore.get(args.where.id) ?? null;
		}
	}
};
