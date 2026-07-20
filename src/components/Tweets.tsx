import React from 'react';
import { motion } from 'motion/react';
import { Tweet } from 'react-tweet';

export const Tweets: React.FC = () => {
  const latestPosts = [
    "2079191249270067664",
    "2079189888168022024",
    "2076292087402709367",
    "2072366339134464434",
    "2071518286638907766"
  ];

  const correctPredictions = [
    "2079066908926599333",
    "2071518286638907766",
    "2079189888168022024",
    "2079183573639176258",
    "2060812368012017747",
    "2049939093748851021",
    "2061485662558146910"
  ];

  return (
    <section id="tweets" className="w-full max-w-4xl mx-auto px-6 relative z-10 pt-16 pb-32" style={{ paddingBottom: 'max(6rem, env(safe-area-inset-bottom))' }}>
      
      <div className="mb-24">
        <h2 className="text-3xl font-display font-bold text-white mb-8 drop-shadow-md text-center">Latest Posts</h2>
        
        <div className="space-y-12 mb-12">
          {latestPosts.map((tweetId, index) => (
            <motion.div 
              key={tweetId + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
               <div className="dark bg-zinc-900/30 backdrop-blur-xl border border-white/20 rounded-3xl p-4 w-full max-w-lg shadow-2xl flex justify-center tweet-container-glass">
                 <Tweet id={tweetId} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-display font-bold text-white mb-8 drop-shadow-md text-center">Correct Predictions</h2>
        
        <div className="space-y-12 mb-12">
          {correctPredictions.map((tweetId, index) => (
            <motion.div 
              key={tweetId + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
               <div className="dark bg-zinc-900/30 backdrop-blur-xl border border-white/20 rounded-3xl p-4 w-full max-w-lg shadow-2xl flex justify-center tweet-container-glass">
                 <Tweet id={tweetId} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <a 
            href="https://x.com/jasonforreels" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/20 rounded-full transition-all duration-300 backdrop-blur-xl shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span className="text-white font-medium">View all updates on X</span>
            <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
      
    </section>
  );
};

