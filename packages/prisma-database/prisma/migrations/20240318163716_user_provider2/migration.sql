-- CreateIndex
CREATE INDEX `user.providerName` ON `users`(`provider_name`);

-- CreateIndex
CREATE INDEX `user.providerUid` ON `users`(`provider_uid`);

-- RedefineIndex
CREATE UNIQUE INDEX `userProvider` ON `users`(`provider_name`, `provider_uid`);
DROP INDEX `users_provider_name_provider_uid_key` ON `users`;
