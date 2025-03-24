import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHRProcess } from "@/contexts/HRProcessContext";
import { Bell, CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

const NotificationCenter = () => {
  const { notifications, removeNotification } = useHRProcess();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Central de Notificações</h1>
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6" />
          <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
            {notifications.length}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">Nenhuma notificação no momento</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card key={notification.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {getNotificationIcon(notification.type)}
                    <div>
                      <h3 className="font-semibold">{notification.title}</h3>
                      <p className="text-gray-600">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter; 