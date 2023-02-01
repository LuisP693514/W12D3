# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :email, :username, :session_token, presence: true, uniqueness: true
  validates :email, length: {in: 3..255}, format: {with: URI::MailTo::EMAIL_REGEXP }
  validates :username, length: {in: 3..30}, format: {without: URI::MailTo::EMAIL_REGEXP , message: '%{attribute} cannot be an email'}
  validates :password, length: {in: 6..255}, allow_nil: true

  
  before_validation :ensure_session_token

  def self.find_by_credentials(u, p)
    user = self.find_by(username: u) || self.find_by(email: u)

    user&.authenticate(p) ? user : nil
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end


  private

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end


end
