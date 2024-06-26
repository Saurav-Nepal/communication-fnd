/**
 * worker implementation
 *
 * there will be a queue which holds workers to be executed in form of method
 *
 * worker will pick a job for execution, waites till execution, picks up another task unless theres no job remains
 * once job is finished, worker starts polling queue into fixed interval
 */

type Job = () => boolean | Promise<boolean>;

type Queue = { attemptedCount: number; maxAttempt: number; job: Job }[];

export class worker {
    private queues: Queue = [];
    private isAlreadyInExecution = false;

    /**
     * Add job to the worker
     */
    addJob({ job, maxAttempt = 3 }: { job: Job; maxAttempt: number }) {
        this.queues.push({ job, attemptedCount: 0, maxAttempt });
        if (!this.isAlreadyInExecution) {
            this.initiate();
        }
    }

    async initiate() {
        await this.pickupJobToExecute();
    }

    getQueueStatus() {
        return this.queues;
    }

    private async pickupJobToExecute() {
        this.isAlreadyInExecution = true;
        if (this.queues.length) {
            await this.queues[0]?.job();

            this.markJobAsComplete();
        }
        this.isAlreadyInExecution = false;
    }

    private markJobAsComplete() {
        this.queues.shift();
    }
}
