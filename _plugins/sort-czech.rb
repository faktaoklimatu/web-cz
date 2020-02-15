require 'ffi-icu'

module Jekyll
  module SortCzechFilter
    def sort_czech(input, property = nil)
      return [] if input.empty?

      collator = ICU::Collation::Collator.new('cs')

      if property.nil?
        collator.collate(input)
      else
        input.sort { |a, b| collator.compare(a[property], b[property]) }
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::SortCzechFilter)
