import { en } from "./translations/en";
import { fr } from "./translations/fr";
import type { Locale } from "./i18n";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  minutes: number;
  category: string;
  body: string[];
};

const bodies: Record<string, Record<Locale, string[]>> = {
  "school-anxiety-in-lebanese-children": {
    en: [
      "Every September, a new wave of children walks into my consulting room with the same complaint dressed in different words: \"I have a stomach ache.\" \"I don't want to go.\" \"The teacher hates me.\" Behind each sentence sits the same engine, anxiety.",
      "School anxiety in Lebanese children today is layered. There is the universal anxiety of separation and performance. And there is the very Lebanese layer, the inherited stress of parents living through compounded crises, the broken sleep, the kitchen-table conversations a child should not have to overhear.",
      "What can a parent do tonight? First, lower the volume of your own nervous system. Children co-regulate; they cannot calm down in a household that hasn't. Second, ask short questions: \"What was the hardest part of today?\" Then listen without fixing. Third, respect the body. A stomach ache is not a lie, it is anxiety speaking through the only language a child sometimes has.",
      "Therapy helps when the pattern is sticky. CBT teaches a child that thoughts are not facts, that feelings pass, that effort is more honest than perfection. Most school anxiety, treated early, resolves beautifully. Reach out before it calcifies.",
    ],
    fr: [
      "Chaque mois de septembre, une nouvelle vague d'enfants entre dans mon cabinet avec la même plainte habillée de mots différents : « J'ai mal au ventre. » « Je ne veux pas y aller. » « La maîtresse me déteste. » Derrière chaque phrase, le même moteur, l'anxiété.",
      "L'anxiété scolaire chez l'enfant libanais aujourd'hui est en couches. Il y a l'anxiété universelle de la séparation et de la performance. Et il y a la couche très libanaise, le stress hérité des parents vivant des crises cumulées, le sommeil brisé, les conversations de cuisine qu'un enfant ne devrait pas avoir à entendre.",
      "Que peut faire un parent ce soir ? D'abord, baisser le volume de votre propre système nerveux. Les enfants se co-régulent ; ils ne peuvent se calmer dans une maison qui ne l'est pas. Ensuite, posez des questions courtes : « Quelle a été la partie la plus dure d'aujourd'hui ? » Puis écoutez sans réparer. Enfin, respectez le corps. Un mal de ventre n'est pas un mensonge, c'est l'anxiété qui parle dans la seule langue qu'un enfant a parfois.",
      "La thérapie aide quand le schéma s'installe. La TCC apprend à l'enfant que les pensées ne sont pas des faits, que les émotions passent, que l'effort est plus honnête que la perfection. La plupart des anxiétés scolaires, traitées tôt, se résolvent magnifiquement. N'attendez pas qu'elles se figent.",
    ],
  },
  "what-cbt-really-is": {
    en: [
      "Cognitive Behavioral Therapy is the most studied form of psychotherapy in the world. It is also one of the most misunderstood. People imagine CBT as a sterile checklist, homework, worksheets, a therapist with a stopwatch. The reality, when it is practiced well, is the opposite.",
      "CBT begins with a simple, radical idea: our thoughts are not facts. They are weather. The work is not to argue with the weather. It is to learn how to read the sky.",
      "In a typical course of CBT, a patient and I will spend the first sessions mapping the loops, the situations, thoughts, emotions, and behaviors that keep a problem alive. Then, slowly, we test alternatives. We try a new thought and watch what happens in the body. We approach what was avoided and watch what happens in the world. The therapy is built on experiments, not arguments.",
      "Does it work for everyone? No. CBT is one of several effective approaches, and the right approach depends on the person and the problem. But for anxiety, depression, OCD, insomnia, panic, and many phobias, the evidence is overwhelming. If you are hesitating, that hesitation itself is often the first thing worth examining.",
    ],
    fr: [
      "La Thérapie Cognitivo-Comportementale est la forme de psychothérapie la plus étudiée au monde. Elle est aussi l'une des plus incomprises. On imagine la TCC comme une liste stérile, devoirs, fiches, un thérapeute chronomètre en main. La réalité, quand elle est bien pratiquée, est l'inverse.",
      "La TCC commence par une idée simple et radicale : nos pensées ne sont pas des faits. Elles sont une météo. Le travail n'est pas de discuter avec la météo. C'est d'apprendre à lire le ciel.",
      "Dans une cure typique de TCC, un patient et moi passerons les premières séances à cartographier les boucles, les situations, pensées, émotions et comportements qui maintiennent un problème vivant. Puis, lentement, nous testons des alternatives. Nous essayons une nouvelle pensée et observons ce qui se passe dans le corps. Nous approchons ce qui était évité et observons ce qui se passe dans le monde. La thérapie est bâtie sur des expériences, pas des arguments.",
      "Est-ce que ça marche pour tout le monde ? Non. La TCC est l'une des plusieurs approches efficaces, et la bonne approche dépend de la personne et du problème. Mais pour l'anxiété, la dépression, le TOC, l'insomnie, la panique et de nombreuses phobies, les preuves sont écrasantes. Si vous hésitez, cette hésitation elle-même est souvent la première chose à examiner.",
    ],
  },
  "couples-listening": {
    en: [
      "After three decades of couples in this office, I can tell you what most fights are not about. They are not about the dishes, the in-laws, the screen time, or the missed text. They are about the same two questions: do you see me, and do I matter to you.",
      "When couples come in, I almost always begin with the same exercise. Person A speaks for three minutes. Person B does not respond, they only paraphrase. \"What I heard you say was…\" And then they ask, \"Did I get that right?\" Most couples cannot complete this exercise on the first try. The reason is not lack of love. It is decades of listening to respond, not to understand.",
      "The skill of listening to understand is small enough to fit on a notecard, and large enough to remake a marriage. Slow down. Repeat back the meaning, not just the words. Ask the second question. Tolerate silence. Resist the urge to defend yourself before your partner has finished.",
      "I am not promising that listening solves everything. I am telling you that without it, nothing else works.",
    ],
    fr: [
      "Après trois décennies de couples dans ce cabinet, je peux vous dire ce sur quoi la plupart des disputes ne portent pas. Elles ne portent pas sur la vaisselle, les beaux-parents, le temps d'écran, ou le message manqué. Elles portent sur les mêmes deux questions : me vois-tu, et est-ce que je compte pour toi.",
      "Quand les couples viennent, je commence presque toujours par le même exercice. La personne A parle trois minutes. La personne B ne répond pas, elle reformule seulement. « Ce que j'ai entendu, c'est… » Puis elle demande : « Est-ce que j'ai bien compris ? » La plupart des couples n'arrivent pas à compléter cet exercice du premier coup. La raison n'est pas le manque d'amour. C'est des décennies à écouter pour répondre, pas pour comprendre.",
      "La compétence d'écouter pour comprendre est assez petite pour tenir sur une fiche, et assez grande pour refaire un mariage. Ralentissez. Reformulez le sens, pas seulement les mots. Posez la deuxième question. Tolérez le silence. Résistez à l'envie de vous défendre avant que votre partenaire n'ait fini.",
      "Je ne vous promets pas que l'écoute résout tout. Je vous dis que sans elle, rien d'autre ne fonctionne.",
    ],
  },
  "post-crisis-mental-health-lebanon": {
    en: [
      "I have practiced in Lebanon since 1996. I have seen war, recovery, currency collapse, an explosion that broke the city, and waves of grief I did not have textbooks for.",
      "What thirty years has taught me is that a population's mental health is never the sum of its individuals. It is a weather system. When the air is poisoned, every body breathes it. When the news is heavy, every dream is heavy.",
      "And yet, Lebanese resilience is not a myth. It is a learned skill, passed down at kitchen tables and in waiting rooms, in jokes that arrive before the tears do. My job, in this practice, is not to manufacture resilience. It is to give it room to breathe.",
      "If you are reading this and you are tired, I want you to know two things. First, you are not weak, your nervous system is responding rationally to an irrational context. Second, healing is still available. Not perfection, not erasure of what happened, but a life that is yours again.",
    ],
    fr: [
      "Je pratique au Liban depuis 1996. J'ai vu la guerre, la reprise, l'effondrement monétaire, une explosion qui a brisé la ville, et des vagues de deuil pour lesquelles je n'avais pas de manuels.",
      "Ce que trente ans m'ont appris, c'est que la santé mentale d'une population n'est jamais la somme de ses individus. C'est un système météo. Quand l'air est empoisonné, chaque corps le respire. Quand les nouvelles sont lourdes, chaque rêve est lourd.",
      "Et pourtant, la résilience libanaise n'est pas un mythe. C'est une compétence apprise, transmise aux tables de cuisine et dans les salles d'attente, dans les blagues qui arrivent avant les larmes. Mon travail, dans ce cabinet, n'est pas de fabriquer la résilience. C'est de lui donner de l'espace pour respirer.",
      "Si vous lisez ceci et que vous êtes fatigué(e), je veux que vous sachiez deux choses. D'abord, vous n'êtes pas faible, votre système nerveux répond rationnellement à un contexte irrationnel. Ensuite, la guérison est toujours possible. Pas la perfection, pas l'effacement de ce qui s'est passé, mais une vie qui est de nouveau la vôtre.",
    ],
  },
};

export function getPosts(locale: Locale): BlogPost[] {
  const t = locale === "fr" ? fr : en;
  return t.blog.posts.map((p) => ({
    ...p,
    body: bodies[p.slug]?.[locale] ?? bodies[p.slug]?.en ?? [],
  }));
}

export function getPost(locale: Locale, slug: string): BlogPost | undefined {
  return getPosts(locale).find((p) => p.slug === slug);
}
