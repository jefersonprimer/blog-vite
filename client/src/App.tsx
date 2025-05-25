import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Post from "@/pages/Post";
import Category from "@/pages/Category";
import { LanguageProvider } from "@/components/LanguageProvider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/posts/:postId" component={Post} />
      <Route path="/blog/category/:category" component={Category} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Layout>
            <Toaster />
            <Router />
          </Layout>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
