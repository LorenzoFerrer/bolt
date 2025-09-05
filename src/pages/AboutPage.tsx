import React from 'react';
import { Code, Heart, Users, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Modern Technology',
      description: 'Built with React, TypeScript, and Tailwind CSS for a seamless experience.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with instant loading and smooth interactions.'
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Intuitive interface designed for both readers and content creators.'
    },
    {
      icon: Heart,
      title: 'Crafted with Care',
      description: 'Every detail thoughtfully designed to provide the best blogging experience.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
          About <span className="text-blue-600">BlogCraft</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          A modern, intuitive platform for creating and sharing meaningful content
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Our Story</h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700 leading-relaxed mb-4">
            BlogCraft was born from a simple idea: creating content should be as enjoyable as 
            consuming it. We believe that every voice deserves to be heard, and every story 
            deserves to be told with style and clarity.
          </p>
          
          <p className="text-slate-700 leading-relaxed mb-4">
            Our platform combines the power of modern web technologies with thoughtful design 
            to create an experience that puts content creators first. Whether you're sharing 
            technical insights, personal experiences, or creative works, BlogCraft provides 
            the tools and environment you need to craft compelling content.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            We're committed to simplicity without sacrificing functionality. Every feature 
            is carefully considered and implemented to enhance your blogging experience while 
            maintaining the clean, distraction-free environment that great writing deserves.
          </p>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-4">Our Mission</h3>
        <p className="text-slate-700 leading-relaxed">
          To democratize content creation by providing powerful, accessible tools that enable 
          anyone to share their ideas with the world. We believe in the power of stories to 
          connect, educate, and inspire communities.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">{feature.title}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Built by Creators, for Creators</h2>
        <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Our team understands the challenges of content creation because we're creators too. 
          We use BlogCraft daily, constantly refining and improving the experience based on 
          real-world usage and community feedback.
        </p>
      </div>
    </div>
  );
};