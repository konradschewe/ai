import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import fg from 'fast-glob';
import { TextLoader } from 'langchain/document_loaders/fs/text';

export class Memory {
  private embeddings = new HuggingFaceTransformersEmbeddings({
    model: 'Xenova/all-MiniLM-L6-v2',
  });
  private vectorStore = new Chroma(this.embeddings, {
    collectionName: 'example',
  });

  public async init() {
    // Define the root directory and exclude patterns
    const excludePatterns = ['**/node_modules/**', '**/.git/**'];

    // Use fast-glob to find all files recursively, excluding specified patterns
    const files = await fg([`./**/*`], {
      ignore: excludePatterns,
      onlyFiles: true,
    });

    // Load and process each file
    const documents = [];
    for (const file of files) {
      const loader = new TextLoader(file);
      const doc = await loader.load();
      documents.push(...doc);
    }

    console.log('Loaded documents:', documents);

    // Add documents to the vector store
    await this.vectorStore.delete({
      filter: {},
    });
    await this.vectorStore.addDocuments(documents);
  }

  public index() {}
}
