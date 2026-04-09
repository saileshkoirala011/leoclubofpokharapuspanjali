const queue = [];
let workerRunning = false;

const handlers = {
  USER_OPSET: async (payload) => {
    console.log('Processed USER_OPSET job', {
      userId: payload.userId,
      action: payload.action,
      at: new Date().toISOString(),
    });
  },
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const runWorker = async () => {
  if (workerRunning) return;
  workerRunning = true;

  while (workerRunning) {
    const job = queue.shift();
    if (!job) {
      await sleep(400);
      continue;
    }

    try {
      const handler = handlers[job.type];
      if (handler) {
        await handler(job.payload);
      }
    } catch (error) {
      console.error('Queue job failed', job.type, error.message);
    }
  }
};

export const startQueueWorker = () => {
  runWorker().catch((error) => {
    console.error('Queue worker crashed', error.message);
  });
};

export const enqueueJob = (type, payload) => {
  queue.push({ type, payload, createdAt: new Date() });
};

export default {
  startQueueWorker,
  enqueueJob,
};
