import React from "react";
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  X,
  MoreVertical,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "high" | "medium" | "low";
  timestamp: string;
  isRead: boolean;
}

interface AlertsPanelProps {
  alerts?: Alert[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onViewAll?: () => void;
}

const getSeverityIcon = (severity: Alert["severity"]) => {
  switch (severity) {
    case "critical":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case "high":
      return <AlertCircle className="h-5 w-5 text-orange-500" />;
    case "medium":
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    case "low":
      return <Info className="h-5 w-5 text-blue-500" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

const getSeverityColor = (severity: Alert["severity"]) => {
  switch (severity) {
    case "critical":
      return "bg-red-100 text-red-800 border-red-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
};

const AlertsPanel = ({
  alerts = [
    {
      id: "1",
      title: "Flight LA123 Delayed",
      message:
        "Flight LA123 from Santiago to Lima is delayed by 2 hours due to weather conditions.",
      severity: "high",
      timestamp: "2023-06-15T14:30:00Z",
      isRead: false,
    },
    {
      id: "2",
      title: "Maintenance Required",
      message:
        "Aircraft CC-BAE requires immediate maintenance check before next flight.",
      severity: "critical",
      timestamp: "2023-06-15T13:45:00Z",
      isRead: false,
    },
    {
      id: "3",
      title: "Crew Schedule Conflict",
      message: "Potential crew rest violation detected for flight LA456.",
      severity: "medium",
      timestamp: "2023-06-15T12:15:00Z",
      isRead: true,
    },
    {
      id: "4",
      title: "Gate Change",
      message: "Flight LA789 gate changed from A12 to B05.",
      severity: "low",
      timestamp: "2023-06-15T11:30:00Z",
      isRead: true,
    },
  ],
  onMarkAsRead = () => {},
  onDismiss = () => {},
  onViewAll = () => {},
}: AlertsPanelProps) => {
  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-bold flex items-center">
          <Bell className="mr-2 h-5 w-5 text-blue-600" />
          Critical Alerts
          <Badge className="ml-2 bg-red-500 text-white">
            {alerts.filter((a) => !a.isRead).length}
          </Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onViewAll}>
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[250px] overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-b p-3 ${!alert.isRead ? "bg-blue-50" : ""} hover:bg-gray-50 transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 transition-transform hover:scale-110">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div
                    className="animate-slide-in-right"
                    style={{ animationDelay: `${parseInt(alert.id) * 0.1}s` }}
                  >
                    <div className="flex items-center">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <Badge
                        className={`ml-2 text-xs ${getSeverityColor(alert.severity)} transition-all hover:scale-105`}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(alert.timestamp).toLocaleTimeString()} -{" "}
                      {new Date(alert.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {!alert.isRead && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onMarkAsRead(alert.id)}
                      title="Mark as read"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onDismiss(alert.id)}
                    title="Dismiss"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    title="More options"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
