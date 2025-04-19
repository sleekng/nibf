"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QRCodeSVG } from "qrcode.react"
import { Search, User, CheckCircle, XCircle, AlertCircle, Camera, CameraOff } from "lucide-react"
import { toast } from "sonner"
import { QrReader } from "react-qr-reader"
import "webrtc-adapter"
import { Html5QrcodeScanner } from "html5-qrcode"

interface RegistrationData {
  id: number;
  registrationId: string;
  firstName: string;
  lastName: string;
  organization?: string;
  jobTitle?: string;
  email: string;
  phone?: string;
  country?: string;
  interests?: string[];
  specialRequirements?: string;
  ticketType: string;
  createdAt: string;
}

// Custom QR Reader component with better error handling
const CustomQrReader = ({ onResult, onError }: { onResult: (result: any, error: any) => void, onError: (error: any) => void }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const qrScannerRef = useRef<Html5QrcodeScanner | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set initialized state after component mounts
    setIsInitialized(true);
    
    // Cleanup function
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear();
        qrScannerRef.current = null;
      }
      setIsInitialized(false);
      setIsCameraReady(false);
    };
  }, []);
  
  useEffect(() => {
    if (isInitialized && containerRef.current && !qrScannerRef.current) {
      try {
        // Initialize the QR scanner
        const qrScanner = new Html5QrcodeScanner(
          "qr-reader",
          { 
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            showTorchButtonIfSupported: true,
          },
          false
        );
        
        qrScannerRef.current = qrScanner;
        
        // Start scanning
        qrScanner.render(
          (decodedText) => {
            // Success callback
            console.log("QR Code detected:", decodedText);
            onResult({ text: decodedText }, null);
          },
          (errorMessage) => {
            // Error callback
            console.error("QR Scan error:", errorMessage);
            
            // If we've retried too many times, report the error
            if (retryCount >= maxRetries) {
              onError(new Error(errorMessage));
              return;
            }
            
            // Otherwise, increment retry count and try again
            setRetryCount(prev => prev + 1);
          }
        );
        
        // Set camera ready after a short delay
        setTimeout(() => {
          setIsCameraReady(true);
        }, 1000);
      } catch (error) {
        console.error("Error initializing QR scanner:", error);
        onError(error);
      }
    }
  }, [isInitialized, onResult, onError, retryCount, maxRetries]);
  
  if (!isInitialized) {
    return <div className="w-full h-full flex items-center justify-center">Initializing camera...</div>;
  }
  
  return (
    <div className="relative w-full h-full">
      {!isCameraReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-2"></div>
            <p>Initializing camera...</p>
          </div>
        </div>
      )}
      <div id="qr-reader" ref={containerRef} className="w-full h-full"></div>
    </div>
  );
};

export default function ScanQRPage() {
  const router = useRouter();
  const [qrData, setQrData] = useState("");
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanMode, setScanMode] = useState<"manual" | "camera">("manual");
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanAttempts, setScanAttempts] = useState(0);
  const [showManualInput, setShowManualInput] = useState(false);
  const MAX_SCAN_ATTEMPTS = 3;
  const [isScanning, setIsScanning] = useState(false);

  // Reset states when switching modes
  useEffect(() => {
    if (scanMode === "camera") {
      // Reset states when switching to camera mode
      setError(null);
      setCameraError(null);
      setScanResult(null);
      setScanAttempts(0);
      setShowManualInput(false);
      setIsScanning(true);
      
      // Check if the browser supports the required APIs
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError("Your browser doesn't support camera access. Please try a different browser.");
        toast.error("Camera access not supported");
        setIsScanning(false);
      }
    } else {
      setIsScanning(false);
    }
  }, [scanMode]);

  // Function to handle QR scanning errors
  const handleQrScanError = (error: any) => {
    console.error("Error scanning QR code:", error);
    
    // Increment scan attempts
    setScanAttempts(prev => prev + 1);
    
    // If we've reached the maximum number of attempts, show error and offer alternatives
    if (scanAttempts >= MAX_SCAN_ATTEMPTS) {
      setCameraError("Failed to access camera or scan QR code after multiple attempts. Please try manual entry.");
      toast.error("Failed to scan QR code after multiple attempts");
      setIsScanning(false);
      return;
    }
    
    // Otherwise, show a temporary error and try again
    setCameraError("Failed to access camera or scan QR code. Trying again...");
    toast.error("Failed to scan QR code. Trying again...");
  };

  const handleScan = async () => {
    if (!qrData.trim()) {
      toast.error("Please enter QR code data");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRegistration(null);

    try {
      const response = await fetch("/api/scan-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qrData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to scan QR code");
      }

      setRegistration(data.registration);
      toast.success("Registration found!");
    } catch (error: any) {
      console.error("Error scanning QR code:", error);
      setError(error.message || "An error occurred while scanning the QR code");
      toast.error(error.message || "Failed to scan QR code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanResult = (result: any, error: any) => {
    if (error) {
      handleQrScanError(error);
      return;
    }

    try {
      if (!result) {
        return;
      }

      // Check if result is a valid object with a text property
      if (typeof result !== 'object' || result === null) {
        console.error("Invalid result format:", result);
        setCameraError("Invalid QR code format");
        toast.error("Invalid QR code format");
        return;
      }

      const scannedText = result?.text;
      if (!scannedText || typeof scannedText !== 'string') {
        console.error("No text found in QR code or invalid format:", result);
        setCameraError("Invalid QR code format");
        toast.error("Invalid QR code format");
        return;
      }

      console.log("Scanned QR code:", scannedText);
      setQrData(scannedText);
      setScanResult(scannedText);
      setScanAttempts(0); // Reset scan attempts on successful scan
      setIsScanning(false);
      
      // Add a small delay before calling handleScan to ensure state updates are processed
      setTimeout(() => {
        handleScan();
      }, 100);
    } catch (err) {
      console.error("Error processing QR code:", err);
      setCameraError("Error processing QR code");
      toast.error("Error processing QR code");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-navy-500">Scan Attendee QR Code</h1>
        <p className="text-slate-600">
          Scan or enter QR code data to retrieve attendee information
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Card className="mb-8 p-6">
          <div className="mb-6">
            <div className="mb-4 flex justify-center space-x-4">
              <Button
                variant={scanMode === "manual" ? "default" : "outline"}
                onClick={() => setScanMode("manual")}
                className="flex-1"
              >
                Manual Entry
              </Button>
              <Button
                variant={scanMode === "camera" ? "default" : "outline"}
                onClick={() => setScanMode("camera")}
                className="flex-1"
              >
                Use Camera
              </Button>
            </div>

            {scanMode === "manual" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qrData">QR Code Data</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="qrData"
                      value={qrData}
                      onChange={(e) => setQrData(e.target.value)}
                      placeholder="Paste QR code data here"
                      className="flex-1"
                    />
                    <Button onClick={handleScan} disabled={isLoading}>
                      {isLoading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      ) : (
                        <Search className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg">
                  {cameraError ? (
                    <div className="flex flex-col items-center justify-center h-full bg-red-50 p-4 rounded-lg">
                      <XCircle className="h-12 w-12 text-red-500 mb-2" />
                      <p className="text-red-800 text-center">{cameraError}</p>
                      <div className="mt-4 space-y-2 w-full">
                        <Button 
                          onClick={() => {
                            setCameraError(null);
                            setScanAttempts(0);
                            setIsScanning(true);
                          }}
                          className="w-full"
                        >
                          Try Again
                        </Button>
                        <Button 
                          onClick={() => {
                            setShowManualInput(true);
                            setCameraError(null);
                            setIsScanning(false);
                          }}
                          className="w-full"
                        >
                          Enter QR Code Manually
                        </Button>
                        <Button 
                          onClick={() => {
                            setCameraError(null);
                            setScanMode("manual");
                            setIsScanning(false);
                          }}
                          variant="outline"
                          className="w-full"
                        >
                          Switch to Manual Entry
                        </Button>
                      </div>
                    </div>
                  ) : showManualInput ? (
                    <div className="flex flex-col items-center justify-center h-full bg-blue-50 p-4 rounded-lg">
                      <div className="w-full space-y-4">
                        <h3 className="text-lg font-medium text-center">Manual QR Code Entry</h3>
                        <div className="space-y-2">
                          <Label htmlFor="manualQrData">QR Code Data</Label>
                          <Input
                            id="manualQrData"
                            value={qrData}
                            onChange={(e) => setQrData(e.target.value)}
                            placeholder="Enter QR code data here"
                            className="w-full"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => {
                              setShowManualInput(false);
                              setIsScanning(true);
                            }}
                            variant="outline"
                            className="flex-1"
                          >
                            Back to Camera
                          </Button>
                          <Button 
                            onClick={() => {
                              if (qrData.trim()) {
                                handleScan();
                                setShowManualInput(false);
                                setIsScanning(false);
                              } else {
                                toast.error("Please enter QR code data");
                              }
                            }}
                            className="flex-1"
                          >
                            Scan
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <CustomQrReader 
                      onResult={handleScanResult} 
                      onError={handleQrScanError}
                    />
                  )}
                </div>
                {scanResult && (
                  <div className="mt-4 p-4 bg-green-50 rounded-md">
                    <p className="text-green-800">Scanned QR Code: {scanResult}</p>
                  </div>
                )}
                <Button 
                  onClick={() => {
                    setScanMode("manual");
                    setScanResult(null);
                    setCameraError(null);
                  }}
                  className="w-full"
                >
                  Switch to Manual Entry
                </Button>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4 text-red-800">
              <div className="flex items-center">
                <XCircle className="mr-2 h-5 w-5 text-red-500" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {registration && (
            <div className="rounded-md bg-green-50 p-4 text-green-800">
              <div className="mb-4 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                <span className="font-semibold">Registration Found</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-green-100 pb-2">
                  <span className="font-medium">Registration ID:</span>
                  <span className="font-semibold">{registration.registrationId}</span>
                </div>
                <div className="flex justify-between border-b border-green-100 pb-2">
                  <span className="font-medium">Name:</span>
                  <span className="font-semibold">
                    {registration.firstName} {registration.lastName}
                  </span>
                </div>
                <div className="flex justify-between border-b border-green-100 pb-2">
                  <span className="font-medium">Email:</span>
                  <span className="font-semibold">{registration.email}</span>
                </div>
                {registration.organization && (
                  <div className="flex justify-between border-b border-green-100 pb-2">
                    <span className="font-medium">Organization:</span>
                    <span className="font-semibold">{registration.organization}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-green-100 pb-2">
                  <span className="font-medium">Ticket Type:</span>
                  <span className="font-semibold">{registration.ticketType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Registration Date:</span>
                  <span className="font-semibold">
                    {new Date(registration.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="rounded-md bg-blue-50 p-4 text-blue-800">
          <div className="flex items-start">
            <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0 text-blue-500" />
            <div>
              <h3 className="font-semibold">Instructions</h3>
              <p className="mt-1 text-sm">
                To scan an attendee's QR code, either paste the QR code data manually or use the camera to scan the code.
                The system will retrieve the attendee's registration details and display them below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 