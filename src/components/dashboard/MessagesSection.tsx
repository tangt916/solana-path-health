import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DashboardData } from "./types";

interface Props {
  messages: DashboardData["messages"];
  unreadCount: number;
}

export const MessagesSection = ({ messages, unreadCount }: Props) => (
  <section>
    <Tabs defaultValue="messages">
      <TabsList>
        <TabsTrigger value="messages" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          Messages
          {unreadCount > 0 && <Badge className="ml-1 h-5 px-1.5">{unreadCount}</Badge>}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="messages" className="mt-4">
        {messages.length === 0 ? (
          <Card className="p-6 text-center">
            <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No messages yet. Your provider will message you here.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <Card key={msg.id} className="p-4">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {msg.author_name ?? "Your care team"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-foreground whitespace-pre-wrap">{msg.text}</p>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  </section>
);
