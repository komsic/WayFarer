import db from '../index';

export default async (...args) => {
  const [action] = args;
  for (let index = 1; index < args.length; index += 1) {
    const entity = args[index];
    try {
      // eslint-disable-next-line no-await-in-loop
      await db.query(entity[action]());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Migration Operation Failed: ${error}`);
    }
  }
};
