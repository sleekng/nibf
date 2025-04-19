declare module 'paystack' {
    interface PaystackConfig {
      secretKey: string;
    }
  
    interface InitializeTransactionOptions {
      email: string;
      amount: number;
      metadata?: Record<string, any>;
      callback_url?: string;
    }
  
    interface TransactionResponse {
      status: boolean;
      message: string;
      data: {
        authorization_url: string;
        access_code: string;
        reference: string;
      };
    }
  
    interface VerifyTransactionResponse {
      status: boolean;
      message: string;
      data: {
        id: number;
        status: string;
        reference: string;
        amount: number;
        metadata: Record<string, any>;
      };
    }
  
    interface PaystackInstance {
      transaction: {
        initialize(options: InitializeTransactionOptions): Promise<TransactionResponse>;
        verify(reference: string): Promise<VerifyTransactionResponse>;
      };
    }
  
    function Paystack(config: PaystackConfig): PaystackInstance;
    export = Paystack;
  }