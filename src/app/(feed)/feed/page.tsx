"use client";

import { useEffect, useState } from "react";
import "@/app/globals.css";
import { Badge } from "@/components/ui/badge";
import { supabase } from "../../../../utils/supabase/client";

interface Article {
  article_id: string;
  article_title: string;
  article_subheader: string | null;
  article_tag: string;
}

export default function Component() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("article_id, article_title, article_subheader, article_tag");

      if (error) {
        console.error("Error fetching articles:", error);
      } else {
        setArticles(data || []);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col items-center mt-36 min-h-screen text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Loading...</h1>
      </main>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Latest News</h1>
      <div className="space-y-6">
        {articles.map((article) => (
          <div
            key={article.article_id}
            className="group flex flex-col sm:flex-row gap-4 bg-card rounded-lg overflow-hidden hover:bg-muted/50 transition-colors"
          >
            <div className="w-full sm:w-48 h-48 sm:h-32 flex-shrink-0 bg-gray-300">
              {/* Placeholder div for image */}
            </div>
            <div className="flex flex-col justify-center p-4 sm:p-6">
              <Badge className="w-fit mb-2" variant="secondary">
                {article.article_tag}
              </Badge>
              <h2 className="text-xl font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
                {article.article_title}
              </h2>
              <p className="text-muted-foreground line-clamp-2">
                {article.article_subheader}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
