# Inspired by https://github.com/ivantsepp/jekyll-git_metadata

require 'rbconfig'

module Jekyll
  module GitMetadata
    class Generator < Jekyll::Generator

      safe true

      def generate(site)
        puts "                  * Getting git metadata ..."
        raise "Git is not installed" unless git_installed?    

        data = {
          'commit_hash' => %x{ git rev-parse HEAD }.strip,
          'commit_hash_short' => %x{ git rev-parse --short HEAD }.strip,
          'commit_date' => %x{ git log -1 --date=short --format=%cd }.strip
        }
        site.config['git'] = data
      end

      def git_installed?
        null = RbConfig::CONFIG['host_os'] =~ /msdos|mswin|djgpp|mingw/ ? 'NUL' : '/dev/null'
        system "git --version >>#{null} 2>&1"
      end

    end
  end
end
