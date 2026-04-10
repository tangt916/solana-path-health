-- Allow users to insert their own subscriptions (needed for checkout)
CREATE POLICY "Users can insert their own subscription"
ON public.subscriptions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to insert their own payments
CREATE POLICY "Users can insert their own payments"
ON public.payments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to insert their own orders
CREATE POLICY "Users can insert their own orders"
ON public.orders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);