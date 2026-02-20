import { motion } from "framer-motion";
import { Github, ExternalLink, Shield, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  type: string;
  githubUrl?: string;
  demoUrl?: string;
  index: number;
}

export function ProjectCard({ title, description, tech, type, githubUrl, demoUrl, index }: ProjectCardProps) {
  const { toast } = useToast();

  const handleShare = () => {
    const shareData = {
      title: title,
      text: description,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${title} - ${description} ${window.location.href}`);
    toast({
      title: "Link copied!",
      description: "Project details copied to clipboard.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="glass h-full flex flex-col group hover:-translate-y-2 transition-transform duration-300 border-border bg-card">
        <CardHeader className="relative p-6">
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
              data-testid={`button-share-${index}`}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
            <Shield className="w-24 h-24 text-primary" />
          </div>
          <div className="flex justify-between items-start mb-2">
            <div className="space-y-1">
              <span className="text-xs font-mono text-primary/80 uppercase tracking-wider">{type}</span>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6 pt-0">
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <Badge 
                key={t} 
                variant="outline" 
                className="bg-primary/5 border-primary/20 text-primary/80 text-xs font-mono hover:bg-primary/10"
              >
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex gap-4 mt-auto">
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>
          )}
          {demoUrl && (
            <a 
              href={demoUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
